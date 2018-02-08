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
 * Creates a new post
 * @param req
 * @param res
 */
const create = (req, res) => {
  new Post(req.body)
    .save()
    .then(post => res.send(post))
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
  const { id } = req.params;

  Post
    .findByIdAndRemove(id)
    .then(() => res.send({ success: true }))
    .catch(() => res.send({ errors: { posts: 'Error removing post' } }));
};

module.exports = {
  index,
  create,
  update,
  remove,
};