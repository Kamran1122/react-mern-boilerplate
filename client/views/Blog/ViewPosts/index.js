import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../../api';
import { removePost } from '../../../api';
import { Row, Col } from 'react-flexbox-grids';

class ViewPostsContainer extends Component {
  state = {
    posts: [],
  };

  componentWillUnmount() {
    this.unmounted = true;
  }

  componentDidMount() {
    getPosts()
      .then(res => {
        const posts = res.data || [];
        !this.unmounted && this.setState({ posts })
      })
      .catch(err => {
        console.log('Error fetching posts');
      })
  }

  remove = (id) => {
    removePost(id)
      .then(res => {
        console.log('removed');
      })
      .catch(err => {
        console.log('failed to remove');
      })
  };

  render() {
    return (
      <ViewPosts
        posts={this.state.posts}
        removePost={this.remove}
        {...this.props}
      />
    );
  }
}

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

export default ViewPostsContainer