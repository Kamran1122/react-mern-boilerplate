import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {
  return (
    <div>
      Home
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default Home;
