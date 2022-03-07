'use strict';
let users = require("../../data/users.json")

function datos() {
    for (let i = 0; i < users.length; i++) {
        users[i] = {
            userName: users[i].userName,
            firstName: users[i].firstName,
            lastName: users[i].lastName,
            email: users[i].email,
            number: users[i].number,
            password: users[i].password,
            avatar: users[i].avatar,
            rol: users[i].rol,
            createdAt: new Date,
            updatedAt: new Date
        }
    }
    return users
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', datos(), {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
