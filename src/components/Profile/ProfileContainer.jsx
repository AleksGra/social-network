import React, { useEffect } from 'react';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getProfile,
  getProfileStatus,
  saveProfileThunk,
  setProfilePhotoThunk
} from '../../Redux/reducers/profileReducer';
import { compose } from 'redux';
import withAuthRedirect from '../Hoc/WithAuthRedirect';

const ProfileContainer = props => {
  const myId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  let params = useParams();
  let userId = params.userId;
  if (!userId) {
    userId = myId;
  }
  const profile = useSelector(state => state.profile.userProfile);
  const status = useSelector(state => state.profile.status);

  useEffect(() => {
    dispatch(getProfile(userId));
    dispatch(getProfileStatus(userId));
  }, [status,userId]);
  const setProfilePhoto= (file)=>{
    dispatch(setProfilePhotoThunk(file))
  }
const saveProfile=(formData)=>{
    dispatch(saveProfileThunk(formData))

}

  return <Profile saveProfile={saveProfile} isOwner={!params.userId} profile={profile} status={status} setProfilePhoto={setProfilePhoto} />;
};

export default compose(withAuthRedirect)(ProfileContainer);
