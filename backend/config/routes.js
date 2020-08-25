module.exports = app => {
    app.get('/:user/likes', app.api.like.find)
    app.get('/:user/likes/:likedUser', app.api.like.findByUser)
}