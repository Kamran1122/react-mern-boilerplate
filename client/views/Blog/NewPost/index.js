import React from 'react';
import { Link } from 'react-router-dom';

const NewPost = () => {
  return (
    <div>
      New Posts
      <Link to="/posts">Post</Link>
    </div>
  );
};

export default NewPost;