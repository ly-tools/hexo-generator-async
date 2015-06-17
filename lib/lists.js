
var path = require('path');

module.exports = function(config) {
	var pagination = require('./tool/pagination')(config);
	var makePost = require('./maker/post')(config);
	var makeUrl = require('./maker/url')(config);
  return function(posts) {
    return pagination({
      path: path.join(makeUrl.lists, 'list.json'),
      data: {
        posts: posts.map(function(post) {
          return makePost(post, config, true);
        })
      }
    });
  };
};