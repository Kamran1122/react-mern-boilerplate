import React from 'react';
import { Link } from 'react-router-dom';
import BlogWrapper from '../components/BlogWrapper';

const MyPosts = () => {
  return (
    <BlogWrapper>
      View My Posts
      <Link to="/posts">Post</Link>
    </BlogWrapper>
  );
};

export default MyPosts;