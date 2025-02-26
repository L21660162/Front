import PageBody from '../../components/ui/maintenance/maintenanceBody';
import PageHeading from '../../components/ui/maintenance/maintenanceHeading';

function Dashboard() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeading />
        </div>
      </div>
      <div className="col-12">
        <PageBody />
      </div>
    </div>
  );
}

export default Dashboard;
