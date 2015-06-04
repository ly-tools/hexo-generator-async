var url = require('url');

module.exports = function(post, baseUrl) {
    return {
        id: post._id,
        tags: post.tags.data.map(function(tag) {
            return {
                id: tag._id,
                name: tag.name,
                permalink: tag.permalink,
                url: url.resolve(baseUrl, 'async/tags/' + tag.name + '.json')
            };
        }),
        categories: post.categories.data.map(function(cat) {
            return {
                id: cat._id,
                name: cat.name,
                permalink: cat.permalink,
                url: url.resolve(baseUrl, 'async/categories/' + cat.name + '.json')
            };
        }),
        content: post.raw.split('---').slice(1).join('---'),
        url: url.resolve(baseUrl, 'async/posts/' + post.name + '.json'),
        date: post.date._i,
        title: post.title,
        permalink: post.permalink
    };
};