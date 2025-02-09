import React, { useState, useEffect } from "react";
import { Employee, EmployeeFormData } from "../../../types/employee.types";
import { omit } from "lodash";

type Props = {
  employee?: Employee;
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
};

const EmployeeForm: React.FC<Props> = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    department: "",
    phoneNumber: "",
    hireDate: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData(omit(employee, ["id"]));
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={handleOnChange}
            name="firstName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            name="lastName"
            onChange={handleOnChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={handleOnChange}
            name="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={handleOnChange}
            name="phoneNumber"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            value={formData.position}
            name="position"
            onChange={handleOnChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            value={formData.department}
            name="department"
            onChange={handleOnChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hire Date
          </label>
          <input
            type="date"
            value={formData.hireDate}
            name="hireDate"
            onChange={handleOnChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            required
          />
        </div>
        {/* Add similar input fields for email, position, department, phoneNumber, and hireDate */}
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-[#1e3b69] rounded-md hover:opacity-80"
        >
          {employee ? "Update" : "Create"} Employee
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
