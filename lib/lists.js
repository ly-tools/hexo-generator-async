
var path = require('path');

module.exports = function(config) {
	var pagination = require('./tool/pagination')(config);
	var postMaker = require('./maker/post')(config);
	var urlMaker = require('./maker/url')(config);
  return function(posts) {
    return pagination({
      path: path.join(urlMaker.lists, 'list.json'),
      data: {
        posts: posts.map(function(post) {
          return postMaker(post, true);
        })
      }
    });
  };
};