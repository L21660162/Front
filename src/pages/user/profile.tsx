import React from 'react';
import BodyProfile from '../../components/ui/user/profile/profileBody';
import PageHeadingProfile from '../../components/ui/user/profile/profileHeading';

function UserProfile() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeadingProfile />
        </div>
      </div>
      <div className="col-12">
        <BodyProfile />
      </div>
    </div>
  );
}

export default UserProfile;
