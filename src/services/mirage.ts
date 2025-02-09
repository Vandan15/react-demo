import { createServer, Model, Response } from "miragejs";
import { Employee } from "../types/employee.types";

const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    position: "Software Engineer",
    department: "Engineering",
    phoneNumber: "123-456-7890",
    hireDate: "2023-01-15",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@company.com",
    position: "Product Manager",
    department: "Product",
    phoneNumber: "123-456-7891",
    hireDate: "2023-02-15",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@company.com",
    position: "UI Designer",
    department: "Design",
    phoneNumber: "123-456-7892",
    hireDate: "2023-03-15",
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.w@company.com",
    position: "Data Scientist",
    department: "Analytics",
    phoneNumber: "123-456-7893",
    hireDate: "2023-04-15",
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    email: "david.b@company.com",
    position: "DevOps Engineer",
    department: "Operations",
    phoneNumber: "123-456-7894",
    hireDate: "2023-05-15",
  },
  {
    id: "6",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.d@company.com",
    position: "QA Engineer",
    department: "Engineering",
    phoneNumber: "123-456-7895",
    hireDate: "2023-06-15",
  },
  {
    id: "7",
    firstName: "James",
    lastName: "Miller",
    email: "james.m@company.com",
    position: "Backend Developer",
    department: "Engineering",
    phoneNumber: "123-456-7896",
    hireDate: "2023-07-15",
  },
  {
    id: "8",
    firstName: "Lisa",
    lastName: "Wilson",
    email: "lisa.w@company.com",
    position: "Frontend Developer",
    department: "Engineering",
    phoneNumber: "123-456-7897",
    hireDate: "2023-08-15",
  },
  {
    id: "9",
    firstName: "Robert",
    lastName: "Taylor",
    email: "robert.t@company.com",
    position: "System Architect",
    department: "Engineering",
    phoneNumber: "123-456-7898",
    hireDate: "2023-09-15",
  },
  {
    id: "10",
    firstName: "Amanda",
    lastName: "Anderson",
    email: "amanda.a@company.com",
    position: "Project Manager",
    department: "Product",
    phoneNumber: "123-456-7899",
    hireDate: "2023-10-15",
  },
];

export function makeServer() {
  return createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      MOCK_EMPLOYEES.forEach((employee) => {
        server.create("employee", employee);
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/employees", (schema) => {
        const employees = schema.all("employee");
        return new Response(200, {}, employees?.models);
      });

      this.post("/employees", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("employee", {
          ...attrs,
          id: Math.random().toString(36).substr(2, 9),
        }).attrs;
      });

      this.put("/employees/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const employee = schema.find("employee", id);
        return employee?.update(attrs) || new Response(404);
      });

      this.delete("/employees/:id", (schema, request) => {
        const id = request.params.id;
        schema.find("employee", id)?.destroy();
        return new Response(204);
      });
    },
  });
}
