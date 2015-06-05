var path = require('path');
var makeTag = require('./maker/tag');
var pagination = require('./tool/pagination');
module.exports = function(tags, config) {
  return pagination(tags.map(function(tag) {
    return {
      path: path.join(config.base, 'tags', tag.name + '.json'),
      data: makeTag(tag, config, true)
    };
  }), config.perPage);
};