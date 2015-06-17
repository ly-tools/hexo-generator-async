var path = require('path');
module.exports = function(config) {
	var urlMaker = require('./maker/url')(config);
  return function(globalConfig) {
    return [{
      path: urlMaker.config,
      data: globalConfig
    }];
  };
};