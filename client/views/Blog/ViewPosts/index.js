import React, { Component } from 'react';
import { getPosts } from '../../../api';
import { Link } from 'react-router-dom';
import { removePost } from '../../../api';
// - [ ] Api call
// - [ ] Async errors
// - [ ] Sync errors
// - [ ] Route on save
// - [ ] initial values

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
        {...this.props}
        posts={this.state.posts}
        removePost={this.remove}
      />
    );
  }
}

const Post = (props) => {
  return (
    <div>
      <div>
        <button onClick={props.removePost}>
          Delete
        </button>
        <button>
          <Link to={`posts/edit/${props._id}`}>Edit</Link>
        </button>
      </div>
      <h2>title: {props.title}</h2>
      <p>content: {props.content}</p>
    </div>
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
    <div>
      <Link to="/posts/new">
        New Post
      </Link>
      <Link to="/logout">
        Log Out
      </Link>
      <Posts posts={posts} removePost={removePost} />
    </div>
  );
};

export default ViewPostsContainer