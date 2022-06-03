import React from 'react';
import classes from './Post.module.css';

const Post = ({ message, likeCounts }) => {
  return (
    <>
      <div className={classes.item}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQahP8KdSO-tV3lDYllKTftXPTJ2H6UYlFevQ&usqp=CAU" />
        {message}
      </div>
      <span>likes </span>
      {likeCounts}
    </>
  );
};

export default Post;
