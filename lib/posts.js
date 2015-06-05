var makePost = require('./maker/post');
var path = require('path');

module.exports = function (posts, config) {
	return posts.map(function(post){
		return {
			path: path.join(config.base, 'posts', post.path.slice(0, -1) + '.json'),
			data: makePost(post, config)
		};
	});
};