import React, { useEffect, useState } from 'react';
import module from './dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendMessageCreator } from '../../Redux/reducers/actions';
import { compose } from 'redux';
import withAuthRedirect from '../Hoc/WithAuthRedirect';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../Common/FormControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const AddMessageForm = props => {
  //const maxLength50 = maxLengthCreator(50);
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        //validate={[required, maxLength50]}
        name={'message'}
        placeholder={'input message'}
      />
      <button>ADD</button>
    </form>
  );
};
const AddMessageReduxForm = reduxForm({
  form: 'dialogAddMessageForm',
})(AddMessageForm);

const Dialogs = props => {
  const dispatch = useDispatch();

  const addNewMessage = values => {
    dispatch(sendMessageCreator(values.message));
  };

  const dialogsData = useSelector(state => state.dialog.dialogsData);
  const profilePage = useSelector(state => state.dialog.posts);
  const isAuth = useSelector(state => state.auth.isAuth);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      return navigate('/login');
    }
  }, [isAuth]);

  return (
    <div className={module.dialogs}>
      <div className={module.dialogsItems}>
        <div className={module.items}>
          {dialogsData.map(name => (
            <DialogItem name={name.name} key={name.id} id={name.id} />
          ))}
        </div>
      </div>
      <div className={module.messages}>
        {profilePage.map(message => (
          <Message key={message.id} message={message.message} />
        ))}
        <AddMessageReduxForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

export default Dialogs;
