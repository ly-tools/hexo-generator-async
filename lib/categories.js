var path = require('path');
var makeCategory = require('./maker/category');

module.exports = function(categories, config) {
    return categories.map(function(category) {
        return {
            path: path.join(config.async_generator.base, 'categories/' + category.name + '.json'),
            data: JSON.stringify(makeCategory(category, config.url))
        };
    });
};