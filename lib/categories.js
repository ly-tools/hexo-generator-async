var path = require('path');

module.exports = function(config) {
	var pagination = require('./tool/pagination')(config);
	var makeCategory = require('./maker/category')(config);
	var makeUrl = require('./maker/url')(config);
  return function(categories) {
    return pagination(categories.map(function(category) {
      return {
        path: path.join(makeUrl.categories, category.name + '.json'),
        data: makeCategory(category, config, true)
      };
    }));
  };
};