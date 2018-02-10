import React from 'react';
import { Col, Row } from 'react-flexbox-grids';

const Header = props => {
  return (
    <Row>
      <Col xs={4}></Col>
      <Col xs={4}><h2>WebDeveloperPR Blog</h2></Col>
      <Col xs={4}></Col>
    </Row>
  );
};

export default Header;