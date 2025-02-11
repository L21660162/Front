import React from 'react';
import PageHeading from '../../../components/ui/home/PageHeading';
import DashboardAttendancePanel from '../../../components/ui/home/crudHome';

function Dashboard() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeading />
        </div>
        <div className="col-12">
          <DashboardAttendancePanel />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
