import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grids';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import { faThumbsUp, faComment } from '@fortawesome/fontawesome-free-regular';
// `posts/${props._id}`

const Post = props => {
  return (
    <div
      className="blog-post-card">
      <Row className="blog-post-header">
        <Col xs className="blog-post-header-left-side">
          <div className="blog-post-header-user-info">
            <img className="blog-post-header-user-avatar" src="https://placehold.it/450x450" alt="" />
            <div className="blog-post-header-user-text-wrapper">
              <span className="blog-post-header-user-name">username</span>
              <span className="blog-post-header-user-handle">@webdeveloperpr</span>
            </div>
          </div>
        </Col>
        <Col xs className="blog-post-header-right-side">
          <button>
            JavacScript +1
          </button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>
            Why are front-end JS dev's so afraid of the DOM? It's not like she's got a
            whip!
          </h2>
          <p>
            ignorance is more appropriate? I'm really asking because with a certain client
            I
            just dealt with a major XSS hole that was screwing them entirely because they
            were using jQuery's html() to slop markup -- including user defined values --
            into the page.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="blog-post-footer">
          <button className="btn blog-btn blog-btn-upvote">
            <FontAwesomeIcon className="blog-btn-icon blog-btn-icon-upvote" icon={faThumbsUp} />
            Upvote 4
          </button>
          <button className="btn blog-btn blog-btn-follow">
            <FontAwesomeIcon className="blog-btn-icon" icon={faPlusCircle} />
            Follow
          </button>
          <button className="btn blog-btn blog-btn-answer">
            <FontAwesomeIcon className="blog-btn-icon" icon={faComment} />
            Answer
          </button>
        </Col>
      </Row>
      {/*<div>*/}
      {/*<button onClick={props.removePost}>*/}
      {/*Delete*/}
      {/*</button>*/}
      {/*<button>*/}
      {/*</button>*/}
      {/*</div>*/}
      {/*<p className="ellipsis">content: {props.content}</p>*/}
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

export default Posts;