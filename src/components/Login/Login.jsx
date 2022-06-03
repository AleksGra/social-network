import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormControls';
import { required } from '../../utils/validators/validators';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../Redux/reducers/AuthReducer';
import { Navigate } from 'react-router-dom';

const LoginForm = (props) => {


  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Input} name={'email'} placeholder={'E-mail'} validate={required} />
      </div>
      <div>
        <Field component={Input} validate={required} name={'password'} placeholder={'Password'} />
      </div>
      <div>
        <Field component={'input'} name={'rememberMe'} type="checkbox" />
        remember me
      </div>
      <div>{props.captchaUrl && <img src={props.captchaUrl} />}
          <div>{props.captchaUrl &&  <Field component={'input'} validate={required} name={'captcha'} placeholder={'Symbols from imafe'}/>}</div>

      </div>

      <div>
        <button>Login</button>
      </div>
    </form>
  );
};
const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm);

const Login = props => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const captchaUrl=useSelector(state=>state.auth.captchaUrl)

  const onSubmit = formData => {
    // lesson 75 all from form comes to formData after handelsubmit in form and onSubmit in LoginReduxForm

    dispatch(loginThunk(formData.email, formData.password, formData.rememberMe,formData.captcha));
  };
  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

export default Login;
