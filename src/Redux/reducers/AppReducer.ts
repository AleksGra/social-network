import { SET_INITIALIZED_SUCCESS, setInitializedSuccessAC} from './actions';

import {getAuthUserDataThunk} from "./AuthReducer";

export type initialStateType = {
  initialized: boolean;
};
const initialState:initialStateType= {
  initialized: false,

};


const appReducer = (state = initialState, action):initialStateType  => {
  switch (action.type) {
    case SET_INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized:true,
      };
    default:
      return state;
  }
};
export const initializeApp = () => {
  return dispatch => {
   let promise= dispatch(getAuthUserDataThunk())
    Promise.all([promise])
        .then(()=>{
          dispatch(setInitializedSuccessAC())
        })
    };
  };

export default appReducer;
