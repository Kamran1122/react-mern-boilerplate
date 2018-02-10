import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Col, Row } from 'react-flexbox-grids';
import '../../styles.scss';

const BlogWrapper = props => {
  return (
    <Row>
      <Col xs={12} className="blog-header">
        <Header />
      </Col>
      <Col xs={12} className="blog-body">
        {props.children}
      </Col>
      <Col xs={12} className="blog-footer">
        <Footer />
      </Col>
    </Row>
  );
};

export default BlogWrapper;