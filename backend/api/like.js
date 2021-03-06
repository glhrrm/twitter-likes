const { apiCall } = require('../config/api')

module.exports = app => {
    const find = (req, res) => {
        const user = req.params.user
        const count = req.query.count

        apiCall(user, count)
            .then(data => res.send(data.filter(tweet =>
                tweet.hasOwnProperty('extended_entities')
                && tweet.extended_entities.hasOwnProperty('media')
            ).map(tweet => {
                const name = tweet.user.name
                const username = tweet.user.screen_name
                const profileImage = tweet.user.profile_image_url.replace('_normal.', '.')
                const tweetUrl = `http://twitter.com/${username}/status/${tweet.id_str}`
                const images = []
                tweet.extended_entities.media.map(m => images.push(m.media_url))

                return { name, username, profileImage, tweetUrl, images }
            })))
            .catch(err => res.send(err))
    }

    const findByUser = (req, res) => {
        const { user, likedUser } = req.params
        const count = req.query.count

        apiCall(user, count)
            .then(data => res.send(data.filter(tweet =>
                tweet.hasOwnProperty('extended_entities')
                && tweet.extended_entities.hasOwnProperty('media')
                && tweet.user.screen_name.toLowerCase() == likedUser.toLowerCase()
            ).map(tweet => {
                const username = tweet.user.screen_name
                const name = tweet.user.name
                const profileImage = tweet.user.profile_image_url.replace('_normal.', '.')
                const tweetUrl = `http://twitter.com/${username}/status/${tweet.id_str}`
                const images = []
                tweet.extended_entities.media.map(m => images.push(m.media_url))

                return { name, username, profileImage, tweetUrl, images }
            })))
            .catch(err => res.send(err))
    }

    return { find, findByUser }
}