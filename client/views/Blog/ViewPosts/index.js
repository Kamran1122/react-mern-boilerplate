import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grids';
import { actions as blogActions } from '../../../reducers/blog';

const Post = (props) => {
  return (
    <>
      <div>
        <button onClick={props.removePost}>
          Delete
        </button>
        <button>
          <Link to={`posts/edit/${props._id}`}>Edit</Link>
        </button>
      </div>
      <h2><Link to={`posts/${props._id}`}>{props.title}</Link></h2>
      <p className="ellipsis">content: {props.content}</p>
    </>
  );
};

const Posts = ({ posts = [], removePost }) => {
  return posts.map(post => {
    return (
      <Post
        removePost={() => removePost(post._id)}
        title={post.title}
        _id={post._id}
        content={post.content}
        key={post._id}
      />
    );
  });
};

const ViewPosts = (props) => {
  const { posts, removePost } = props;

  return (
    <Posts posts={posts} removePost={removePost} />
  );
};

class ViewPostsContainer extends Component {
  componentWillUnmount() {
    this.unmounted = true;
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <ViewPosts{...this.props} />
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