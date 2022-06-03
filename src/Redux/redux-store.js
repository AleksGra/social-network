import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import dialogReducer from './reducers/dialoReducer';
import sideBarReducer from './reducers/sideBarReducer';
import profileReducer from './reducers/profileReducer';
import thunk from 'redux-thunk';
import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/AuthReducer';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./reducers/AppReducer";
import chatReducer from "./reducers/chatReducers";

const reducers = combineReducers({
  profile: profileReducer,
  dialog: dialogReducer,
  sideBar: sideBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app:appReducer,
  chat:chatReducer
});
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers( applyMiddleware(thunk)
));
// const store = createStore(reducers, applyMiddleware(thunk));
export default store;

