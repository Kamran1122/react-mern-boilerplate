// Creates a valid post.
const createPost = (props = {}) => ({
  title: 'hello@world.com',
  content: '<p>Hello World!</p>',
  status: 'published',
  category: 'react',
  ...props,
});

module.exports = {
  createPost,
};