import React from 'react';
import module from './users.module.css';
import userFoto from '../../assets/avatarka.gif';
import { NavLink } from 'react-router-dom';
import Paginator from '../Common/Paginator';

const User = ({ user, handelClickFollow, handelClickUnfollow, followingInProgress, }) => {
  return (
    <div>
      <div>
        <NavLink to={'/profile/' + user.id}>
          <img src={user.photos.small != null ? user.photos.small : userFoto} alt={'userFoto'} />
        </NavLink>
      </div>
      <div>
        {user.followed ? (
          <button
            disabled={followingInProgress.some(id => id === user.id)}
            onClick={() => handelClickUnfollow(user.id)}
          >
            UNFOLLOW
          </button>
        ) : (
          <button
            disabled={followingInProgress.some(id => id === user.id)}
            onClick={() => handelClickFollow(user.id)}
          >
            FOLLOW
          </button>
        )}
      </div>
      <div>
        <span>{user.name}</span>
        <div>
          <span>{`STATUS ${user.status}`}</span>
        </div>
      </div>
      <div>
        <span>{'u.location.country'}</span>
        <div>{'u.location.city'}</div>
      </div>
      ))}
    </div>
  );
};
export default User;
