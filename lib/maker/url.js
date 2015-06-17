var path = require('path');
module.exports = function(config) {
	var base = config.base;
	return {
		categories: path.join(base, 'categories'),
		tags: path.join(base, 'tags'),
		posts: path.join(base, 'posts'),
		lists: path.join(base, 'lists'),
		archives: path.join(base, 'archives'),
		config: path.join(base, 'config.json')
	};
};