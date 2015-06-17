var path = require('path');

module.exports = function(config) {
	var pagination = require('./tool/pagination')(config);
  var tagMaker = require('./maker/tag')(config);
  var urlMaker = require('./maker/url')(config);
  return function(tags) {
    return pagination(tags.map(function(tag) {
      return {
        path: path.join(urlMaker.tags, tag.name + '.json'),
        data: tagMaker(tag, true)
      };
    })).concat([{
    	path: path.join(config.base, 'tags.json'),
    	data: tags.map(function (tag) {
    		return tagMaker(tag, false);
    	})
    }]);
  };
};