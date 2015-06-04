var makePost = require('./post');
var url = require('url');

module.exports = function(tag, baseUrl) {
    return {
        id: tag._id,
        name: tag.name,
        permalink: tag.permalink,
        url: url.resolve(baseUrl, 'async/tags/' + tag.name + '.json'),
        posts: tag.posts.data.map(function(post) {
            return makePost(post, baseUrl)
        })
    };
};