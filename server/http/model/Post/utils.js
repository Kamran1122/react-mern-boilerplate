// Creates a valid post.
const createPost = (props = {}) => ({
  title: 'hello@world.com',
  content: '<p>Hello World!</p>',
  status: 'published',
  category: 'React',
  ...props,
});

module.exports = {
  createPost,
};