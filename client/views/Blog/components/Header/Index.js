import React from 'react';
import { Col, Row } from 'react-flexbox-grids';

const Header = props => {
  return (
    <Row>
      <Col xs={4}></Col>
      <Col xs={4} className="text-center"><h4>WebDeveloperPR Blog</h4></Col>
      <Col xs={4}></Col>
    </Row>
  );
};

export default Header;