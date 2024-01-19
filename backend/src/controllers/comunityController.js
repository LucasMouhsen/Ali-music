/* const fs = require('fs');
const path = require('path');
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'comunity.json'), 'utf-8'));*/
const db = require('../database/models')
const { youtubeLink, spotifyLink } = require('../utils/convertirLinkYt');

module.exports = {
    comunity: (req, res) => {
        db.Post.findAll({
            include: ['user', 'type'],
            order: [
                ['id', 'DESC']
            ]
        })
            .then(posts => {
                res.render('comunity/comunity', {
                    title: 'Comunidad',
                    posts: posts
                })
            })
        /* return res.render('comunity/comunity',{
            title: 'Comunidad',
            posts
        }) */

    },
    addIframe: (req, res) => {
        const { postName, description, iframe } = req.body
        let iframe2 = iframe.split('.')
        const newPost = {
            userId: 1,
            postName: postName.trim(),
            /* iframe: 'https://www.youtube.com/embed/' + youtubeLink(iframe), */
            iframe: iframe2.find(element => element == 'youtube') ? 'https://www.youtube.com/embed/' + youtubeLink(iframe) : 'https://open.spotify.com/embed/playlist/' + spotifyLink(iframe),
            image: null,
            video: null,
            description: description.trim(),
            typeId: 2,
        }
        db.Post.create(newPost)
            .then(() => {
                return res.redirect('/comunity')
            })
    },
    addDescription: (req, res) => {
        const { postName, description } = req.body
        const newPost = {
            userId: 1,
            postName: postName.trim(),
            iframe: null,
            image: null,
            video: null,
            description: description.trim(),
            typeId: 1,
        }
        db.Post.create(newPost)
            .then(() => {
                return res.redirect('/comunity')
            })
    },
    addMedia: (req, res) => {
        const { postName, description, media } = req.body
        if (req.file.filename.split('.').pop() === 'mp4') {
            const newPost = {
                userId: 1,
                postName: postName.trim(),
                iframe: null,
                image: null,
                video: req.file.filename,
                description: description.trim(),
                typeId: 4,
            }
            db.Post.create(newPost)
                .then(() => {
                    return res.redirect('/comunity')
                })
        } else {
            const newPost = {
                userId: 1,
                postName: postName.trim(),
                iframe: null,
                image: req.file.filename,
                video: null,
                description: description.trim(),
                typeId: 3,
            }

            db.Post.create(newPost)
                .then(() => {
                    return res.redirect('/comunity')
                })
        }
    }
}