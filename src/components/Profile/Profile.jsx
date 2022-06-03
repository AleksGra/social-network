import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = ({ profile, status, isOwner, setProfilePhoto, saveProfile }) => {
  return (
    <div className="card">
      <ProfileInfo
        saveProfile={saveProfile}
        isOwner={isOwner}
        profile={profile}
        status={status}
        setProfilePhoto={setProfilePhoto}
      />
      <MyPosts />
    </div>
  );
};

export default Profile;
