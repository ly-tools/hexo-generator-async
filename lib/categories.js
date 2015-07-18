var path = require('path');

module.exports = function(config) {
	var pagination = require('./tool/pagination')(config);
	var catMaker = require('./maker/category')(config);
	var urlMaker = require('./maker/url')(config);
  return function(categories) {
    return pagination(categories.map(function(category) {
      return {
        path: path.join(urlMaker.categories, category.name + '.json'),
        data: catMaker(category, true)
      };
    })).concat([{
      path: path.join(config.base, 'categories.json'),
      data: categories.map(function (cat) {
        return catMaker(cat, false);
      })
    }]);
  };
};