import React from "react";
import { Employee } from "../../../types/employee.types";

interface Props {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeCard: React.FC<Props> = ({ employee, onEdit, onDelete }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => {
        onEdit(employee);
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-gray-600">{employee.position}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(employee);
            }}
            className="px-3 py-1 text-sm bg-[#1e3b69] text-white rounded hover:opacity-80 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(employee.id);
            }}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {employee.department && (
          <p className="text-gray-600">
            <span className="font-medium">Department:</span>{" "}
            {employee.department}
          </p>
        )}
        <p className="text-gray-600">
          <span className="font-medium">Email:</span> {employee.email}
        </p>
        {employee.phoneNumber && (
          <p className="text-gray-600">
            <span className="font-medium">Phone:</span> {employee.phoneNumber}
          </p>
        )}
        {employee.hireDate && (
          <p className="text-gray-600">
            <span className="font-medium">Hire Date:</span> {employee.hireDate}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
