const express = require('express')
const fetch = require('node-fetch')

const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAIQjHAEAAAAADcYypaf6RxoMgMbK%2FVFgx3waopI%3DW7WqrlkuO8uwUzhKl73uDUbprSKdQy36BmsLPtCTIoZadwPyyc'

app = express()

app.listen(3003)

fetch('https://api.twitter.com/1.1/favorites/list.json?'
    + new URLSearchParams({
        count: 5,
        screen_name: 'francinepairet',
    }), {
    headers: {
        'Authorization': `Bearer ${bearerToken}`
    }
})
    .then(res => {
        return res.json()
    })
    .then(data => data.map(tweet => {
        const userId = tweet.user.id
        const username = tweet.user.screen_name
        const profileImage = tweet.user.profile_image_url // muito pequena

        const tweetUrl = ''

        const images = []

        if (tweet.hasOwnProperty('extended_entities')) {
            if (tweet.extended_entities.hasOwnProperty('media')) {
                tweet.extended_entities.media.map(m => images.push(m.media_url))
            }
        }

        console.log({ userId, username, profileImage, images })

        return { userId,  username, profileImage, images }
    }))
    .catch(err => {
        console.log(err)
    })