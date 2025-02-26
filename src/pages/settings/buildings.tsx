import React from 'react';
import BuildingCrud from '../../components/ui/building/buildingCrud';
import PageHeadingbuilding from '../../components/ui/building/buildingHeading';

function BuildingDashboard() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeadingbuilding />
        </div>
      </div>
      <div className="col-12">
        <BuildingCrud />
      </div>
    </div>
  );
}

export default BuildingDashboard;
