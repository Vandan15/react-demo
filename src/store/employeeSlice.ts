import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Employee, EmployeeFormData } from "../types/employee.types";

type EmployeeState = {
  employees: Employee[];
  loading: boolean;
  error: string | null;
};

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async () => {
    const response = await fetch("/api/employees");
    return response.json();
  }
);

export const addEmployee = createAsyncThunk(
  "employees/add",
  async (employee: EmployeeFormData) => {
    const response = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    return response.json();
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, data }: { id: string; data: EmployeeFormData }) => {
    const response = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id: string) => {
    await fetch(`/api/employees/${id}`, { method: "DELETE" });
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (e) => e.id === action.payload?.employee.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload?.employee;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (e) => e.id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;
