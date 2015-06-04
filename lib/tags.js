var path = require('path');
var makeTag = require('./maker/tag');

module.exports = function(tags, config) {
    return tags.map(function(tag) {
        return {
            path: path.join(config.async_generator.base, 'tags/' + tag.name + '.json'),
            data: JSON.stringify(makeTag(tag, config.url))
        };
    });
};