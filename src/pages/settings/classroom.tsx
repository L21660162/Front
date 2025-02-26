import ClassroomCrud from '../../components/ui/classroom/classroomCrud';
import PageHeadingclassroom from '../../components/ui/classroom/classroomHeading';

function classroomsSettings() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeadingclassroom />
        </div>
      </div>
      <div className="col-12">
        <ClassroomCrud />
      </div>
    </div>
  );
}

export default classroomsSettings;
