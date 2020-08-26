async function appendData() {
    const tweetsContainer = document.getElementById('tweets-container')

    tweetsContainer.innerHTML = ''

    const user = document.getElementById('user').value

    const likedUser = document.getElementById('liked-user').value

    const url = `http://localhost:3003/${user}/likes/${likedUser}`

    const tweets = await fetch(url).then(res => res.json())

    tweets.map(tweet => {
        tweet.images.map(image => {
            let imageWrapper = document.createElement('div')
            imageWrapper.className = 'image-wrapper'
            tweetsContainer.appendChild(imageWrapper)

            let img = document.createElement('img')
            img.src = image
            imageWrapper.appendChild(img)

            const { username, profileImage, tweetUrl } = tweet
    
            let infoSpan = document.createElement('span')
            infoSpan.className = 'info-span'
            infoSpan.textContent = username
            imageWrapper.appendChild(infoSpan)
        })

    })
}