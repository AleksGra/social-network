import {authAC, SET_AUTH_DATA, SET_TOTAL_COUNT} from './actions';
import {authAPI, securityAPI} from '../../API/api';

const GET_CAPTCHA_URL_SUCCESS='GET_CAPTCHA_URL_SUCCESS'
export type InitialStateType={
  id: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean,
  captchaUrl:string | null
}
const initialState:InitialStateType = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl:null
};

const authReducer = (state = initialState, action:any):InitialStateType => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        ...action.payload.data,
      };
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        captchaUrl:action.payload.captchaUrl,
      };
    default:
      return state;
  }
};
export const getAuthUserDataThunk = () => {
  return dispatch => {
    authAPI.getMe().then(data => {
      if (data.resultCode === 0) {
        let { login, id, email } = data.data;
        dispatch(authAC(email, id, login, true));
      }
    });
  };
};
export const loginThunk = (email, password, rememberMe,captcha) => {
  return dispatch => {
    authAPI.login(email, password, rememberMe,captcha).then(data => {
      if (data.resultCode === 0) {
        dispatch(getAuthUserDataThunk());
      }else{
        if(data.resultCode===10){
          dispatch(getCaptchaUrl())
        }
      }
    });
  };
};
export const getCaptchaUrl = () =>
  async(dispatch)=>{
    const response=await securityAPI.getCaptchaUrl();
    const captchaUrl=response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
  }



export const logoutThunk = () => {
  return dispatch => {
    authAPI.logout().then(data => {
      if (data.resultCode === 0) {
        dispatch(authAC(null, null, null, false));
      }
    });
  };
};

type GetCaptchaUrlSuccessActionType={
  type:typeof GET_CAPTCHA_URL_SUCCESS
  payload:{captchaUrl:string}

}
export const getCaptchaUrlSuccess = (captchaUrl:string):GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {
    captchaUrl,
  },
});
export default authReducer;
