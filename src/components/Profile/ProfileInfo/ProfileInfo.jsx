import React, { useState } from 'react';
import classes from './profileInfo.module.css';
import Preloader from '../../Common/Preloader';
import ProfileStatus from '../../ProfileStatus/ProfileStatus';
import userFoto from '../../../assets/avatarka.gif';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({ profile, status, isOwner, setProfilePhoto, saveProfile }) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const handleSetProfilePhoto = e => {
    if (e.target.files.length) {
      setProfilePhoto(e.target.files[0]);
    }
  };
  const onSubmit = formData => {
    saveProfile(formData);
    setEditMode(false);
  };

  return (
    <div className="card-body">
      {/*<div>*/}
      {/*  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR563zwATHZ8pvggtUl0sQc5OgQxFL3GoJcLg&usqp=CAU" />*/}
      {/*</div>*/}
      <div className={classes.description}>
        <img src={profile.photos.large || userFoto} />
        {isOwner && (
          <div>
            <input className="form-control" type="file" onChange={handleSetProfilePhoto} />
          </div>
        )}
        {editMode ? (
          <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
        ) : (
          <ProfileData
            profile={profile}
            isOwner={{ isOwner }}
            setEditMode={() => setEditMode(true)}
          />
        )}

        <ProfileStatus status={status} />
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, setEditMode }) => {
  return (
    <div className="list-group">
      {isOwner && (
        <div>
          <button onClick={setEditMode} className="btn btn-secondary btn-sm">
            Edit Profile
          </button>
        </div>
      )}
      <div className="list-group-item">
        <b>FULL NAME : </b> {profile.fullName}
      </div>

      <div className="list-group-item">
        <b> Looking for a job : </b>
        {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {profile.lookingForAJob && (
        <div className="list-group-item">
          <b> My profissional skils{profile.lookingForAJobDescription}</b>
        </div>
      )}
      <div className="list-group-item">
        <b> About me </b>
        {profile.aboutMe}
      </div>
      <div className="list-group-item">
        <b> Contacts : </b>
        {Object.keys(profile.contacts).map(key => {
          return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />;
        })}
      </div>
    </div>
  );
};

export const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle} : </b>
      {contactValue}
    </div>
  );
};

export default ProfileInfo;
