const UserController = require('../controller/user/user');
const PostController = require('../controller/post/post');
const jwtAuth = require('../middleware/jwtAuth');

const { sendEmail } = require('../services/mailer');

const authRoutes = app => {
  app.post('/api/login', UserController.login);
  app.post('/api/register', UserController.register);
  app.post('/api/reset-password', UserController.resetPassword);
  app.post('/api/refresh-token', UserController.refreshUserToken);
  app.post('/api/forget-password', UserController.forgetPassword, sendEmail);
};

const userRoutes = app => {
  app.get('/api/users', UserController.index);
  app.get('/api/users/:id', UserController.findById);
};

const postRoutes = app => {
  app.get('/api/posts', PostController.index);
  app.put('/api/posts/:id', PostController.update);
  app.delete('/api/posts/:id', PostController.remove);
  app.post('/api/posts', jwtAuth, PostController.create, UserController.savePost);
};

module.exports = (app) => {
  authRoutes(app);
  postRoutes(app);
  userRoutes(app);
};