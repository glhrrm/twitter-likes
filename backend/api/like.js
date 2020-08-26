const fetch = require('node-fetch')

const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAIQjHAEAAAAADcYypaf6RxoMgMbK%2FVFgx3waopI%3DW7WqrlkuO8uwUzhKl73uDUbprSKdQy36BmsLPtCTIoZadwPyyc'

const api = (screenName, count) =>
    fetch('https://api.twitter.com/1.1/favorites/list.json?'
        + new URLSearchParams({
            count: count,
            screen_name: screenName,
        }), {
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        }
    }).then(res => res.json()).catch(err => res.send(err))

module.exports = app => {
    const find = (req, res) => {
        const user = req.params.user

        api(user, 20)
            .then(data => res.send(data.map(tweet => {
                if (tweet.hasOwnProperty('extended_entities')) {
                    const username = tweet.user.screen_name

                    const profileImage = tweet.user.profile_image_url.replace('_normal.', '.')

                    const tweetUrl = `http://twitter.com/${username}/status/${tweet.id_str}`

                    const images = []

                    if (tweet.extended_entities.hasOwnProperty('media')) {
                        tweet.extended_entities.media.map(m => images.push(m.media_url))
                    }

                    return { username, profileImage, tweetUrl, images }
                }
            }).filter(result => result != null)))
            .catch(err => res.send(err))
    }

    const findByUser = (req, res) => {
        const { user, likedUser } = req.params

        api(user, 20)
            .then(data => res.send(data.map(tweet => {
                if (tweet.hasOwnProperty('extended_entities')) {
                    const username = tweet.user.screen_name

                    if (username.toLowerCase() == likedUser.toLowerCase()) {
                        const profileImage = tweet.user.profile_image_url.replace('_normal.', '.')

                        const tweetUrl = `http://twitter.com/${username}/status/${tweet.id_str}`

                        const images = []

                        if (tweet.extended_entities.hasOwnProperty('media')) {
                            tweet.extended_entities.media.map(m => images.push(m.media_url))
                        }

                        return { username, profileImage, tweetUrl, images }
                    }
                }
            }).filter(result => result != null)))
            .catch(err => res.send(err))
    }

    return { find, findByUser }
}