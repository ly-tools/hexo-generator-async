var path = require('path');
module.exports = function(config) {
	var makeUrl = require('./maker/url')(config);
  return function(globalConfig) {
    return [{
      path: makeUrl.config,
      data: globalConfig
    }];
  };
};