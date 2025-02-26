import React from 'react';
import UserCrud from '../../components/ui/user/userCrud';
import PageHeadingUser from '../../components/ui/user/userHeding';

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
