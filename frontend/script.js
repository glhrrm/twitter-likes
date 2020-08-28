async function appendData() {
    const tweetsContainer = document.getElementById('tweets-container')
    tweetsContainer.innerHTML = ''

    const loader = document.createElement('div')
    loader.className = 'loader'
    tweetsContainer.appendChild(loader)

    const user = document.getElementById('user').value
    const likedUser = document.getElementById('liked-user').value
    const count = document.getElementById('count-input').value

    if (!user) return tweetsContainer.innerHTML = 'User must be informed'

    const url = `http://localhost:3003/${user}/likes/${likedUser}?count=${count}`
    const tweets = await fetch(url).then(res => res.json()).catch(err => res.send(err))

    loader.style.display = 'none'

    if (!tweets.length) return tweetsContainer.innerHTML = 'No tweets found'

    tweets.map(tweet => {
        tweet.images.map(image => {
            const { name, username, profileImage, tweetUrl } = tweet

            let linkToTweet = document.createElement('a')
            linkToTweet.href = tweetUrl
            linkToTweet.setAttribute('target', '_blank')
            linkToTweet.setAttribute.className = 'link-to-tweet'
            tweetsContainer.appendChild(linkToTweet)

            let imageWrapper = document.createElement('div')
            imageWrapper.className = 'image-wrapper'
            linkToTweet.appendChild(imageWrapper)

            let img = document.createElement('img')
            img.className = 'tweet-image'
            img.src = image
            imageWrapper.appendChild(img)

            let tweetInfo = document.createElement('div')
            tweetInfo.className = 'tweet-info'
            imageWrapper.appendChild(tweetInfo)

            let profileImageWrapper = document.createElement('div')
            profileImageWrapper.className = 'profile-image-wrapper'
            tweetInfo.appendChild(profileImageWrapper)

            let tweetProfileImage = document.createElement('img')
            tweetProfileImage.className = 'profile-image'
            tweetProfileImage.src = profileImage
            profileImageWrapper.appendChild(tweetProfileImage)

            let tweetUserInfo = document.createElement('div')
            tweetUserInfo.className = 'tweet-user-info'

            let divName = document.createElement('div')
            divName.className = 'div-name'
            divName.innerHTML = name
            tweetUserInfo.appendChild(divName)

            let divUsername = document.createElement('div')
            divName.className = 'div-username'
            divUsername.innerHTML = `@${username}`
            tweetUserInfo.appendChild(divUsername)

            tweetInfo.appendChild(tweetUserInfo)
        })
    })
}