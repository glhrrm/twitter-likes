const fetch = require('node-fetch')
const { bearerToken } = require('./.env')

const apiCall = (screenName, count) =>
    fetch('https://api.twitter.com/1.1/favorites/list.json?'
        + new URLSearchParams({
            count: count,
            screen_name: screenName,
        }), {
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        }
    }).then(res => res.json()).catch(err => res.send(err))

module.exports = { bearerToken, apiCall }