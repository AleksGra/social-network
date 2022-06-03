import {
  ADD_POST,
  SET_PROFILE,
  SET_PROFILE_PHOTO,
  SET_PROFILE_STATUS,
  setProfileAC,
  setProfilePhotoAC,
  setProfileStatusAC,
} from './actions';
import { authAPI, profileAPI } from '../../API/api';
import {stopSubmit} from "redux-form";

const initialState = {
  message: [
    { id: 1, message: 'This is my first post', like: 1 },
    { id: 2, message: 'This is my second post', like: 11 },
    { id: 3, message: 'This is my third post', like: 6 },
    { id: 4, message: 'This is my fourth post', like: 77 },
    { id: 5, message: 'This is my fifth post', like: 88 },
  ],
  userProfile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 44,
        message: action.payload.text,
        like: 555,
      };
      // let stateCopy={...state};
      // stateCopy.message=[...state.message];
      return {
        ...state,
        message: [...state.message, newPost],
      };
    case SET_PROFILE:
      return {
        ...state,
        userProfile: action.payload.profile,
      };
    case SET_PROFILE_STATUS:
      return {
        ...state,
        status: action.payload.status,
      };
    case SET_PROFILE_PHOTO:
      return {
        ...state,
        userProfile: { ...state.userProfile, photos: action.payload.file },
      };

    default:
      return state;
  }
};
export const getProfile = userId => {
  return dispatch => {
    // dispatch(toggleIsLoadingAC(true))
    authAPI.fetchAuthUser(userId).then(data => {
      // dispatch(toggleIsLoadingAC(false))
      dispatch(setProfileAC(data));
    });
  };
};
export const getProfileStatus = userId => {
  return dispatch => {
    profileAPI.getProfileStatus(userId).then(data => {
      dispatch(setProfileStatusAC(data));
    });
  };
};
export const updateProfileStatus = status => {
  return dispatch => {
    profileAPI.updateProfileStatus(status).then(data => {
      if (data.resultCode === 0) {
        dispatch(setProfileStatusAC(data.status));
      }
    });
  };
};

export const setProfilePhotoThunk = file => {
  return dispatch => {
    profileAPI.updateProfilePhoto(file).then(data => {
      if (data.resultCode === 0) {
        dispatch(setProfilePhotoAC(data.data.photos));
      }
    });
  };
};
export const saveProfileThunk = profile => {
  return (dispatch, getState) => {
    const userId = getState().auth.id;
    profileAPI.saveProfile(profile).then(data => {
      if (data.resultCode === 0) {
        dispatch(getProfile(userId));
      }else{
        dispatch(stopSubmit('edit-profile'), {_error:data.messages[0]})
     return Promise.reject(data.messages[0])
      }
    });
  };
};
export default profileReducer;
