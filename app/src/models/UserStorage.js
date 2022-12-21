"use strict"

class UserStorage {
    static #users = {
        id: ["aaa", "bbb", "ccc"],
        psword: ["123", "1234", "12345"],
        name: ["가나다", "구누두", "고노도"]
    }

    static getUsers (...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUserInfo (id) {
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const userInfo = Object.keys(users).reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo
    }

    static save (userInfo) {
        
    }
}


module.exports = UserStorage;