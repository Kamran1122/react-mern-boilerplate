import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div>
      Home
      <Link to="/logout">Logout</Link>
      <Link to="/blog">Blog</Link>
    </div>
  );
};

export default Home;
