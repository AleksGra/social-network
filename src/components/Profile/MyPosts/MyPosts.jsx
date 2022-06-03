import React, { useState } from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { addPostCreator } from '../../../Redux/reducers/actions';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../Common/FormControls';

const maxLength10 = maxLengthCreator(10);
const MyPostsForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        placeholder={'type post'}
        component={Textarea}
        name={'post'}
        validate={[required, maxLength10]}
      />
      <button>Add post</button>
    </form>
  );
};
const MyPostsReduxForm = reduxForm({
  form: 'myPosts',
})(MyPostsForm);

const MyPosts = () => {
  const dispatch = useDispatch();
  const onSubmit = formData => {
    dispatch(addPostCreator(formData.post));
  };

  // const textFromArea = React.createRef()
  // const [text, setText] = useState('')

  const postData = useSelector(state => state.profile.message);

  // const handleChange = () => {
  //     const text = textFromArea.current.value
  //     setText(text)
  // }
  // const handleClick = () => {
  //     // addPost(text)
  //     dispatch(addPostCreator(text))
  //     setText("")
  // }

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <MyPostsReduxForm onSubmit={onSubmit} />
      <div className={classes.posts}>
        {postData.map(message => (
          <Post key={message.id} message={message.message} likeCounts={message.like} />
        ))}
      </div>
    </div>
  );
};

export default MyPosts