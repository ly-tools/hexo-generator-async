var path = require('path');
module.exports = function(config) {
	var makePost = require('./maker/post')(config);
	var makeUrl = require('./maker/url')(config);
  return function(posts) {
    return posts.map(function(post) {
      return {
        path: path.join(makeUrl.posts, post.path.slice(0, -1) + '.json'),
        data: makePost(post, config)
      };
    });
  };
};