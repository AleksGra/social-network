import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import { useDispatch, useSelector } from 'react-redux';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeApp } from './Redux/reducers/AppReducer';
import { setInitializedSuccessAC } from './Redux/reducers/actions';
import Preloader from './components/Common/Preloader';
import {ChatPage} from "./pages/chat/ChatPage";

const App = () => {
  const dispatch = useDispatch();
  const catchAllUnhandledErrors = promiseRejectionEvent => {
    console.error('Some error occured');
  };
  useEffect(() => {
    dispatch(initializeApp());
    window.addEventListener('unhandledrejection', catchAllUnhandledErrors);
    return () => window.removeEventListener('unhandledrejection', catchAllUnhandledErrors);
  }, []);
  const isInitialized = useSelector(state => state.app.initialized);
  if (!isInitialized) {
    return <Preloader />;
  }
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/" element={<UsersContainer />} />
            <Route path="/profile" element={<ProfileContainer />} />
            <Route path="/dialog" element={<Dialogs />} />
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<ChatPage />} />
            {/*   <Route path="news" element={<News/>}/>
                        <Route path="music" element={<Music/>}/>
                        <Route path="setting" element={<Setting/>}/>
*/}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
