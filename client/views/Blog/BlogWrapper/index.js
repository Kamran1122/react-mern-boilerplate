import React from 'react';
import Header from '../Header/Index';
import Footer from '../Footer/Index';
import SidebarLeft from '../ViewPosts/SidebarLeft';
import SidebarRight from '../ViewPosts/SidebarRight';
import { Col, Row, Container } from 'react-flexbox-grids';
import '../styles.scss';

const BlogWrapper = props => {
  return (
    <>
      <Container className="header">
        <Container>
          <Header />
        </Container>
      </Container>

      <Container className="container fluid blog-body">
        <Col xs className="blog-sidebar">
          <SidebarLeft />
        </Col>
        <Col xs className="blog-content">
          {props.children}
        </Col>
        <Col xs className="blog-sidebar-2">
          <SidebarRight />
        </Col>
      </Container>

      <Container fluid>
        <Container>
          <Row className="blog-footer">
            <Footer />
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default BlogWrapper;