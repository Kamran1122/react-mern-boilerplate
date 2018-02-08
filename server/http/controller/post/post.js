const Post = require('../../model/Post');

/**
 * Fetches all posts
 * @param req
 * @param res
 */
const index = (req, res) => {
  res.send({ success: true });
};

/**
 * Creates a new post
 * @param req
 * @param res
 */
const create = (req, res) => {
  res.send({ success: true });
};

/**
 * Update a post by Id
 * @param req
 * @param res
 */
const update = (req, res) => {
  res.send({ success: true });
};

/**
 * Update a post by Id
 * @param req
 * @param res
 */
const remove = (req, res) => {
  res.send({ success: true });
};

module.exports = {
  index,
  create,
  update,
  remove,
};