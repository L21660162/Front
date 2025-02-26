import React from 'react';
import SubjectCrud from '../../components/ui/subject/subjectCrud';
import PageHeading from '../../components/ui/subject/subjectHeding';

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
