//convertir link youtube a link iframe

module.exports = {
    youtubeLink: (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
        var match = url.match(regExp)
        return (match && match[7].length == 11) ? match[7] : false
    },
    spotifyLink : (url) => {
        /* embled iframe playlist */
        var regExp = /(https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|album\/)([a-zA-Z0-9]+))/
        var match = url.match(regExp)
        return (match && match[2].length == 22) ? match[2] : false
    }
}

/* let url = 'https://open.spotify.com/playlist/1rLhCo2moSEAMOSlFQy6Av?si=4d1e4f5d1d144054'
let url2 = 'https://open.spotify.com/track/2JiHR4gCDjXwYVRDmwdk95?si=9f499ba353de4812'
return console.log(spotifyLink(url)); */
