import React from 'react';
import GroupCrud from '../../components/ui/group/groupCrud';
import PageHeadingGroup from '../../components/ui/group/groupHeading';

function groupSettings() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeadingGroup />
        </div>
      </div>
      <div className="col-12">
        <GroupCrud />
      </div>
    </div>
  );
}

export default groupSettings;