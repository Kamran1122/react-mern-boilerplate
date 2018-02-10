import React from 'react';
import { Link } from 'react-router-dom';

const MyPosts = () => {
  return (
    <div>
      View My Posts
      <Link to="/posts">Post</Link>
    </div>
  );
};

export default MyPosts;