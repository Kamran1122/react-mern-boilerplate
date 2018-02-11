import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grids';
import Posts from '../Post';
import { actions as blogActions } from '../../../reducers/blog';

class ViewPostsContainer extends Component {
  componentWillUnmount() {
    this.unmounted = true;
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <Posts
        posts={this.props.posts}
        removePost={this.props.removePost}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.blog.posts,
  }
};

const mapDispatchToProps = {
  fetchPosts: blogActions.fetchPosts,
  removePost: blogActions.removePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPostsContainer);