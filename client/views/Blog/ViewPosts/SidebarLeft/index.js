import React, { Component } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ListItem from './ListItem';
import { CategoryIcon } from '../../ListIcon';
import { actions as blogActions } from '../../../../reducers/blog';

const SidebarLeft = props => {
  return (
    <div className="blog-category-sidebar">
      <div className="blog-category-topic-wrapper">
        <CategoryIcon />
      </div>
      <ul className="blog-category-list">
        <ListItem onClick={props.handleClick('javascript')} icon="js">Javascript</ListItem>
        <ListItem onClick={props.handleClick('react')} icon="react">React</ListItem>
        <ListItem onClick={props.handleClick('node')} icon="node">Node</ListItem>
        <ListItem onClick={props.handleClick('mongoDB')} icon="mongodb">MongoDB</ListItem>
        <ListItem onClick={props.handleClick('css')} icon="css">CSS</ListItem>
        <ListItem onClick={props.handleClick('html')} icon="html">HTML</ListItem>
      </ul>
    </div>
  );
};

SidebarLeft.propTypes = {
  children: PropTypes.node,
};

SidebarLeft.defaultProps = {};

class SidebarLeftContainer extends Component {
  render() {
    return (
      <SidebarLeft {...this.props} />
    );
  }
}

const mapStateToProps = state => {
  return {
    category: state.blog.category,
  }
};

const mapDispatchToProps = (dispatch, props) => {
  const handleClick = category => () => {
    dispatch(blogActions.fetchPosts({ category }));
    dispatch(blogActions.changeCategory(category));
    props.history.push('/');
  };

  return {
    handleClick,
  };
};

export default R.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SidebarLeftContainer);
