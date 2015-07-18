var path = require('path');
var _ = require('lodash');

function pagination(data, perPage) {
  if (!perPage) throw new Error('per_page must be defined!!!');
  var baseName = path.basename(data.path, '.json');
  var dirName = path.dirname(data.path);
  var source = data.data;
  var posts = source.posts;
  delete source.posts;
  source._total = posts.length;
  source._totalPage = Math.ceil(posts.length / perPage);
  var page = 1;
  var result = [];
  for (; posts.length; page++) {
    var pageObj = _.cloneDeep(source);
    pageObj._page = page;
    pageObj.posts = posts.slice(0, perPage);
    posts = posts.slice(perPage);
    result.push({
      path: path.join(dirName, baseName + (page === 1 ? '' : ('-' + page)) + '.json'),
      data: pageObj
    });
  }
  return result;
}

module.exports = function (config){
  var perPage = config.perPage;
  return function(data) {
    if (!Array.isArray(data)) data = [data];
    var result = [];
    data.forEach(function(item) {
      [].push.apply(result, pagination(item, perPage));
    });
    return result;
  };
};