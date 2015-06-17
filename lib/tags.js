var path = require('path');

module.exports = function(config) {
	var pagination = require('./tool/pagination')(config);
  var makeTag = require('./maker/tag')(config);
  var makeUrl = require('./maker/url')(config);
  return function(tags) {
    return pagination(tags.map(function(tag) {
      return {
        path: path.join(makeUrl.tags, tag.name + '.json'),
        data: makeTag(tag, config, true)
      };
    }));
  };
};