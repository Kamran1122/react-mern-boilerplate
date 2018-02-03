const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./http/routes');

const app = express();
const { DIST_DIR_INDEX_FILE, DIST_DIR, DB } = require('../config/constants');

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(DB);
}

// middlewares
app.use(bodyParser.json());
app.use(passport.initialize());

//routes
routes(app);

app.use((err, req, res, next) => {
  return res
    .status(422)
    .send(err);
});

// Development
if (process.env.NODE_ENV === 'development') {
  const webpackDevMiddleWare = require('webpack-dev-middleware');
  const webpackHotMiddleWare = require("webpack-hot-middleware");
  const webpack = require('webpack');
  const config = require('../config/webpack.dev');
  const compiler = webpack(config);

  const devMiddleware = webpackDevMiddleWare(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    noInfo: true
  });

  const hotMiddleware = webpackHotMiddleWare(compiler);

  app.use(devMiddleware);
  app.use(hotMiddleware);

  // Dev files are written to memory
  app.get('*', (req, res) => {
    const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${config.output.path}/index.html`);

    res.send(htmlBuffer.toString())
  });

  // Production
} else {
  // make these files public
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => res.send(DIST_DIR_INDEX_FILE));
}

module.exports = app;
