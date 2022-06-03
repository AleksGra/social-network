export const ADD_POST = 'ADD-POST';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
export const SET_USERS = 'SET_USERS';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT ';
export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING ';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_AUTH_DATA = 'SET_AUTH_DATA';
export const SET_FOLLOW = 'SET_FOLLOW';
export const SET_UNFOLLOW = 'SET_UNFOLLOW';
export const TOGGLE_IS_FOLLOW_PROGRESS = 'TOGGLE_IS_FOLLOW_PROGRESS';
export const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';
export const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS';
export const SET_PROFILE_PHOTO='SET_PROFILE_PHOTO'

export const addPostCreator = text => ({
  type: ADD_POST,
  payload: {
    text,
  },
});

export const sendMessageCreator = text => ({
  type: SEND_MESSAGE,
  payload: {
    text,
  },
});

export const followActionCreator = userId => ({
  type: SET_FOLLOW,
  payload: {
    userId,
  },
});

export const unFollowActionCreator = userId => ({
  type: SET_UNFOLLOW,
  payload: {
    userId,
  },
});

export const setUsersAC = users => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  payload: {
    currentPage,
  },
});
export const setUsersCount = totalCount => ({
  type: SET_TOTAL_COUNT,
  payload: {
    totalCount,
  },
});
export const toggleIsLoadingAC = isLoading => ({
  type: TOGGLE_IS_LOADING,
  payload: {
    isLoading,
  },
});
export const setProfileAC = profile => ({
  type: SET_PROFILE,
  payload: {
    profile,
  },
});
type AuthACActionPayloadDataType={
  email:string|null
  id:number|null
  login:string|null
  isAuth:boolean
}
type AuthACActionPayloadType={
  data:AuthACActionPayloadDataType
}
type AuthACActionType={
  type:typeof SET_AUTH_DATA,
  payload:AuthACActionPayloadType
}
export const authAC = (email:string|null, id:number|null, login:string|null, isAuth:boolean):AuthACActionType => ({
  type: SET_AUTH_DATA,
  payload: {
    data: {
      email,
      id,
      login,
      isAuth,
    },
  },
});

export const followingInProgressAC = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOW_PROGRESS,
  payload: {
    isFetching,
    userId,
  },
});
export const setProfileStatusAC = status => ({
  type: SET_PROFILE_STATUS,
  payload: {
    status,
  },
});
export const setProfilePhotoAC = file => ({
  type: SET_PROFILE_PHOTO,
  payload: {
    file,
  },
});

type SetInitializedSuccessACType={
  type:typeof SET_INITIALIZED_SUCCESS
}
export const setInitializedSuccessAC = ():SetInitializedSuccessACType=> ({
  type: SET_INITIALIZED_SUCCESS,
  });