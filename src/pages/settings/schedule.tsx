import React from 'react';
import ScheduleCrud from '../../components/ui/schedule/scheduleCrud';
import PageHeading from '../../components/ui/schedule/scheduleHeding';

function ScheduleSettings() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeading />
        </div>
      </div>
      <div className="col-12">
        <ScheduleCrud />
      </div>
    </div>
  );
}

export default ScheduleSettings;
