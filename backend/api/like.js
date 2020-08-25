const fetch = require('node-fetch')

const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAIQjHAEAAAAADcYypaf6RxoMgMbK%2FVFgx3waopI%3DW7WqrlkuO8uwUzhKl73uDUbprSKdQy36BmsLPtCTIoZadwPyyc'

const api = (screenName, count) => {
    return fetch('https://api.twitter.com/1.1/favorites/list.json?'
        + new URLSearchParams({
            count: count,
            screen_name: screenName,
        }), {
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        }
    }).then(res => res.json())
}

module.exports = app => {
    const find = (req, res) => {
        const user = req.params.user

        api(user, 5)
            .then(data => data.map(tweet => {
                const username = tweet.user.screen_name

                const profileImage = tweet.user.profile_image_url.replace('_normal.', '.')

                const tweetUrl = `http://twitter.com/${username}/status/${tweet.id_str}`

                const images = []

                if (tweet.hasOwnProperty('extended_entities')) {
                    if (tweet.extended_entities.hasOwnProperty('media')) {
                        tweet.extended_entities.media.map(m => images.push(m.media_url))
                    }
                }

                console.log({ username, profileImage, tweetUrl, images })
            }))
            .catch(err => {
                console.log(err)
            })
    }

    const findByUser = (req, res) => {
        const { user, likedUser } = req.params

        // continuar daqui
    }

    return { find, findByUser }
}