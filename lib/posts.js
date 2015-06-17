var path = require('path');
module.exports = function(config) {
	var postMaker = require('./maker/post')(config);
	var urlMaker = require('./maker/url')(config);
  return function(posts) {
    return posts.map(function(post) {
      return {
        path: path.join(urlMaker.posts, post.path.slice(0, -1) + '.json'),
        data: postMaker(post)
      };
    });
  };
};