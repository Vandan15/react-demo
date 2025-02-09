import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import EmployeeCard from "./EmployeeCard";
import { deleteEmployee } from "../../../store/employeeSlice";
import { Employee } from "../../../types/employee.types";

type Props = { onEdit: (employee: Employee) => void };

const EmployeeList: React.FC<Props> = ({ onEdit }) => {
  const { employees } = useSelector((state: RootState) => state?.employees);
  const dispatch = useDispatch() as AppDispatch;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees
          ?.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={(employee) => {
                onEdit(employee);
              }}
              onDelete={(id) => dispatch(deleteEmployee(id))}
            />
          ))
          ?.reverse()}
      </div>
    </div>
  );
};

export default EmployeeList;
