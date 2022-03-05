'use strict';

const WebpackDevServer = require('webpack-dev-server');
const config           = require('../webpack.config.js');
const webpack          = require('webpack');

// unshift `webpack-dev-server` client
// and hot dev-server
config.entry.unshift('webpack-dev-server/client?/', 'webpack/hot/dev-server');

const compiler = webpack(config);
