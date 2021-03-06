import React from 'react';
import { Col, Row } from 'react-flexbox-grids';
import { NavLink } from 'react-router-dom';

const Header = props => {
  return (
    <Col xs={12} className="header">
      <div className="header-left-section">
        <NavLink to="/" className="header-link">Webdeveloperpr</NavLink>
        <NavLink to="/posts/new" className="header-link">NewPost</NavLink>
        <NavLink to="/about" className="header-link">About</NavLink>
      </div>
      <div className="header-right-section">
        <NavLink to="/" className="header-link"><input type="search" /></NavLink>
        <NavLink to="/logout" className="header-link">Logout</NavLink>
      </div>
    </Col>
  );
};

export default Header;