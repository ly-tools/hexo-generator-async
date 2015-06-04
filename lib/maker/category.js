var makePost = require('./post');
var url = require('url');

module.exports = function(category, baseUrl) {
    return {
        id: category._id,
        name: category.name,
        permalink: category.permalink,
        url: url.resolve(baseUrl, 'async/categories/' + category.name + '.json'),
        posts: category.posts.data.map(function(post) {
            return makePost(post, baseUrl)
        })
    };
};