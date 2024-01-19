'use strict';
let post = require("../../data/posts.json")

function datos() {
    for (let i = 0; i < post.length; i++) {
        post[i] = {
            userId: post[i].userNameId,
            postName: post[i].postName,
            iframe: post[i].iframe,
            image: post[i].image,
            video: post[i].video,
            description: post[i].description,
            typeId: post[i].typeId,
            createdAt: new Date,
            updatedAt: new Date
        }
    }
    return post
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Posts', datos(), {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Posts', null, {});
    }
};
