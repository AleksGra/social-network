import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Users from './Users';
import Preloader from '../Common/Preloader';
import {
  followThunkCreator,
  getUsers,
  paginationUsers,
  unFollowThunkCreator,
} from '../../Redux/reducers/usersReducer';

const UsersContainer = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersPage.users);
  const isLoading = useSelector(state => state.usersPage.isLoading);
  const paginationData = useSelector(state => state.usersPage.pagination);
  const followingInProgress = useSelector(state => state.usersPage.followInProgress);
  // const getUsers = (paginationData) => {
  //     dispatch(toggleIsLoadingAC(true))
  //     usersAPI.fetchUsers(paginationData.currentPage, paginationData.pageSize)
  //         .then(data => {
  //             dispatch(toggleIsLoadingAC(false))
  //             dispatch(setUsersAC(data.items))
  //             dispatch(setUsersCount(data.totalCount))
  //         })
  // }
  // getUsers это thunkCreator мы его диспатчим в  функцию thunk которая принимает видео 66
  //  диспатч который возвращает action

  const handelClickPag = currentPage => {
    dispatch(paginationUsers(currentPage, paginationData));
    // dispatch(toggleIsLoadingAC(true))
    // dispatch(setCurrentPage(currentPage))
    // usersAPI.fetchUsers(currentPage, paginationData.pageSize)
    //     .then(data => {
    //         dispatch(toggleIsLoadingAC(false))
    //         dispatch(setUsersAC(data.items))
    //     })
  };
  useEffect(() => {
    dispatch(getUsers(paginationData));
  }, []);
  const handelClickFollow = userId => {
    dispatch(followThunkCreator(userId));
    // toggleFollowingProgress(true,userId)
    // usersAPI.followUser(userId)
    //     .then(data => {
    //         if (data.resultCode == 0) {
    //             dispatch(followActionCreator(userId))
    //         }
    //         toggleFollowingProgress(false,userId)
    //     })
  };
  const handelClickUnfollow = userId => {
    dispatch(unFollowThunkCreator(userId));
    // toggleFollowingProgress(true,userId)
    // usersAPI.unfollowUser(userId)
    //     .then(data => {
    //         if (data.resultCode == 0) {
    //             dispatch(unFollowActionCreator(userId))
    //         }
    //         toggleFollowingProgress(false,userId)
    //     })
  };
  // const toggleFollowingProgress=(isFetching,userId)=>{
  //   dispatch(followingInProgressAC(
  //       isFetching,userId
  //   ))
  // }

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <Users
          paginationData={paginationData}
          users={users}
          handelClickFollow={handelClickFollow}
          handelClickUnfollow={handelClickUnfollow}
          followingInProgress={followingInProgress}
          handelClickPag={handelClickPag}
        />
      )}
    </>
  );
};
export default UsersContainer;
