import DepartmentCrud from '../../components/ui/department/departmentCrud';
import PageHeadingDepartment from '../../components/ui/department/departmentHeading';

function DepartmentsSettings() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeadingDepartment />
        </div>
      </div>
      <div className="col-12">
        <DepartmentCrud />
      </div>
    </div>
  );
}

export default DepartmentsSettings;
