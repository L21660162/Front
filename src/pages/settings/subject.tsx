import React from 'react';
import PageHeading from '../../components/ui/subjects/subjectHeding';

function SubjectSettings() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeading />
        </div>
      </div>
      <div className="col-12">
        <UserCrud />
      </div>
    </div>
  );
}

export default SubjectSettings;
