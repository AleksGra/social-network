// @ts-ignore
import React from 'react';
import Paginator from '../Common/Paginator';
import User from './User';

const Users = ({
  users,
  paginationData,
  handelClickFollow,
  handelClickUnfollow,
  followingInProgress,
  handelClickPag,
}) => {
  return (
    <div>
      <Paginator paginationData={paginationData} handelClickPag={handelClickPag} />
      {users.map(item => (
        <User
          user={item}
          key={item.id}
          handelClickFollow={handelClickFollow}
          handelClickUnfollow={handelClickUnfollow}
          followingInProgress={followingInProgress}

        />
      ))}
    </div>
  );
};
export default Users;
