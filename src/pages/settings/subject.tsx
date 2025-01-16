import React from 'react';
import PageHeading from '../../components/ui/subjects/subjectHeding';
import SubjectCrud from '../../components/ui/subjects/subjectCrud';

function SubjectSettings() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeading />
        </div>
      </div>
      <div className="col-12">
        <SubjectCrud />
      </div>
    </div>
  );
}

export default SubjectSettings;
