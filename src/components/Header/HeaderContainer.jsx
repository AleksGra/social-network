import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Header from './Header';
import { logoutThunk } from '../../Redux/reducers/AuthReducer';

const HeaderContainer = React.memo(props => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutThunk());
  };
  const authData = useSelector(state => state.auth);
  console.log(authData);
  return <Header {...props} authData={authData} logout={logout} />;
});
export default HeaderContainer;
