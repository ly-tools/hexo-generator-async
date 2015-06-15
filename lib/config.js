var path = require('path');
var stringify = require('json-stringify-safe');
module.exports = function(config) {
  return [{
    path: path.join(config.base, 'config.json'),
    data: config
  }];
};