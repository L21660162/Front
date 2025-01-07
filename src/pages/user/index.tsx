import React from 'react';
import PageHeadingUser from '../../components/ui/user/userHeding';
import UserCrud from '../../components/ui/user/userCrud';

function UserDashboard() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeadingUser />
        </div>
      </div>
      <div className="col-12">
        <UserCrud />
      </div>
    </div>
  );
}

export default UserDashboard;
