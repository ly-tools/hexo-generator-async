var path = require('path');
var makeCategory = require('./maker/category');
var pagination = require('./tool/pagination');
module.exports = function(categories, config) {
  return pagination(categories.map(function(category) {
    return {
      path: path.join(config.base, 'categories', category.name + '.json'),
      data: makeCategory(category, config, true)
    };
  }), config.perPage);
};