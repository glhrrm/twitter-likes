async function appendData() {
    const user = document.getElementById('username').value

    const url = `http://localhost:3003/${user}/likes`

    const tweets = await fetch(url).then(res => res.json())

    const mainContainer = document.getElementById('myData')

    tweets.map(t => {
        if (t.images.length > 0) {
            t.images.map(image => {
                let div = document.createElement('div')
                mainContainer.appendChild(div)

                let img = document.createElement('img')
                img.src = image
                img.height = 300
                div.appendChild(img)
            })
        }
    })
}