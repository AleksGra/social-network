import {
  followActionCreator,
  SET_CURRENT_PAGE,
  SET_FOLLOW,
  SET_TOTAL_COUNT,
  SET_UNFOLLOW,
  SET_USERS,
  setUsersAC,
  setUsersCount,
  TOGGLE_IS_FOLLOW_PROGRESS,
  TOGGLE_IS_LOADING,
  toggleIsLoadingAC,
  followingInProgressAC,
  unFollowActionCreator,
  setCurrentPage,
} from './actions';
import { usersAPI } from '../../API/api';
import { useDispatch } from 'react-redux';

const initialState = {
  users: [],
  pagination: {
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
  },
  isLoading: false,
  followInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case SET_UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case SET_USERS: {
      return {
        ...state,
        users: action.payload.users,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: action.payload.currentPage },
      };
    }
    case SET_TOTAL_COUNT: {
      return {
        ...state,
        pagination: { ...state.pagination, totalUsersCount: action.payload.totalCount },
      };
    }
    case TOGGLE_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }
    case TOGGLE_IS_FOLLOW_PROGRESS: {
      return {
        ...state,
        followInProgress: action.payload.isFetching
          ? [...state.followInProgress, action.payload.userId]
          : state.followInProgress.filter(id => id !== action.payload.userId),
      };
    }

    default:
      return state;
  }
};

export const getUsers = paginationData => {
  return dispatch => {
    dispatch(toggleIsLoadingAC(true));
    usersAPI.fetchUsers(paginationData.currentPage, paginationData.pageSize).then(data => {
      dispatch(toggleIsLoadingAC(false));
      dispatch(setUsersAC(data.items));
      dispatch(setUsersCount(data.totalCount));
    });
  };
};
export const followThunkCreator = userId => {
  return dispatch => {
    dispatch(followingInProgressAC(true, userId));
    usersAPI.followUser(userId).then(data => {
      if (data.resultCode == 0) {
        dispatch(followActionCreator(userId));
      }
      dispatch(followingInProgressAC(false, userId));
    });
  };
};
export const unFollowThunkCreator = userId => {
  return dispatch => {
    dispatch(followingInProgressAC(true, userId));
    usersAPI.unfollowUser(userId).then(data => {
      if (data.resultCode == 0) {
        dispatch(unFollowActionCreator(userId));
      }
      dispatch(followingInProgressAC(false, userId));
    });
  };
};
export const paginationUsers = (currentPage, paginationData) => {
  return dispatch => {
    dispatch(toggleIsLoadingAC(true));
    dispatch(setCurrentPage(currentPage));
    usersAPI.fetchUsers(currentPage, paginationData.pageSize).then(data => {
      dispatch(toggleIsLoadingAC(false));
      dispatch(setUsersAC(data.items));
    });
  };
};
export default usersReducer