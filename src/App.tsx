import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
} from "./store/employeeSlice";
import "./App.css";
import { Employee, EmployeeFormData } from "./types/employee.types";
import EmployeeForm from "./components/modules/employee/EmployeeForm";
import EmployeeList from "./components/modules/employee/EmployeeList";
import { AppDispatch } from "./store";

const App: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleSubmit = async (data: EmployeeFormData) => {
    if (selectedEmployee) {
      dispatch(updateEmployee({ id: selectedEmployee.id, data }));
    } else {
      dispatch(addEmployee(data));
    }
    setShowForm(false);
    setSelectedEmployee(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Employee Management
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-[#1e3b69] text-white rounded-md hover:opacity-80 transition-colors"
          >
            Add Employee
          </button>
        </div>

        {showForm ? (
          <div className="mb-8">
            <EmployeeForm
              employee={selectedEmployee}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setSelectedEmployee(undefined);
              }}
            />
          </div>
        ) : (
          <EmployeeList
            onEdit={(employee) => {
              setShowForm(true);
              setSelectedEmployee(employee);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
