'use strict';

var path = require('path');
var args = require('minimist')(process.argv.slice(2));

// List of allowed environments
var allowedEnvs = ['dev', 'dist', 'test'];

// Set the correct environment
var env;
if(process.env.NODE_ENV) {
  env = process.env.NODE_ENV;
} else {
  env = 'dev';
}
process.env.REACT_WEBPACK_ENV = env;

// Get available configurations
var configs = {
  base: require(path.join(__dirname, 'cfg/webpack.base')),
  dev: require(path.join(__dirname,  'cfg/client/webpack.dev')),
  dist: require(path.join(__dirname, 'cfg/client/webpack.dist')),
  test: require(path.join(__dirname, 'cfg/client/webpack.test'))
};

/**
 * Get an allowed environment
 * @param  {String}  env
 * @return {String}
 */
function getValidEnv(env) {
  var isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1;
  return isValid ? env : 'dev';
}

/**
 * Build the webpack configuration
 * @param  {String} env Environment to use
 * @return {Object} Webpack config
 */
function buildConfig(env) {
  var usedEnv = getValidEnv(env);
  return configs[usedEnv];
}

module.exports = buildConfig(env);
