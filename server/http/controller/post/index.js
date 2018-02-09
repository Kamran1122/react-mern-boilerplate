const Post = require('../../model/Post');

/**
 * Fetches all posts
 * @param req
 * @param res
 */
const index = (req, res) => {
  Post
    .find({})
    .then(posts => res.send(posts))
    .catch(() => ({ errors: { posts: 'Error fetching posts' } }));
};

/**
 * Creates the post and passes it to the next Controller.
 * Notice we don't save the post, we only create it.
 * @param req
 * @param res
 * @param next
 */
const create = (req, res, next) => {
  Post
    .create(req.body)
    .then(post => {
      res.locals.post = post;
      next()
    })

    .catch(() => ({ errors: { posts: 'Error creating post' } }));
};

/**
 * Update a post by Id
 * @param req
 * @param res
 */

const update = (req, res) => {
  const { id } = req.params;

  // TODO: [] validate on update

  Post
    .findByIdAndUpdate(id, req.body, { new: true })
    .then(post => res.send(post))
    .catch(() => ({ errors: { posts: 'Error updating post' } }));
};

/**
 * Remove a post by Id
 * @param req
 * @param res
 */
const remove = (req, res) => {
    const { postId } = req.params;
    const user = res.locals.user;

    user
      .posts
      .remove(postId);

    Promise
      .all([Post.remove({ _id: postId }), user.save()])
      .then(() => res.send({ success: true }))
      .catch(() => res.send({ errors: { post: 'Failed to remove post' } }))
  };

module.exports = {
  index,
  create,
  update,
  remove,
};