import React from 'react';
import { Link } from 'react-router-dom';

const ViewPosts = () => {
  return (
    <div>
      View Posts
      <Link to="/posts">Post</Link>
      <Link to="/asdfasdfsad">asdfasdf</Link>
    </div>
  );
};

export default ViewPosts;