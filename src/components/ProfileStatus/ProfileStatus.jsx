import React, { useState } from 'react';
import { getProfileStatus, updateProfileStatus } from '../../Redux/reducers/profileReducer';
import { useDispatch } from 'react-redux';

const ProfileStatus = ({ status }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputStatus, setInputStatus] = useState(status);
  const dispatch = useDispatch();

  const handelStatusChange = e => {
    e.preventDefault();
    setInputStatus(e.target.value);
  };
  const handelOnBlur = () => {
    setEditMode(false);
    dispatch(updateProfileStatus(inputStatus));
  };

  return (
   <div className="list-group-item"> <b>STATUS :</b>
     {' '}
     {editMode ? (
         <input
             onChange={handelStatusChange}
             autoFocus={true}
             onBlur={handelOnBlur}
             value={inputStatus}
         ></input>
     ) : (
         <span onDoubleClick={() => setEditMode(true)}>{status || 'NO STATUS'}</span>
     )}
   </div>
  );
};

export default ProfileStatus;