import React from 'react';
import DepartamentCrud from '../../components/ui/departament/departamentCrud';
import PageHeadingDepartament from '../../components/ui/departament/departamentHeading';

function DepartmentsSettings() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeadingDepartament />
        </div>
      </div>
      <div className="col-12">
        <DepartamentCrud />
      </div>
    </div>
  );
}

export default DepartmentsSettings;
