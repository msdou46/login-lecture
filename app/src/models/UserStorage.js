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
}


module.exports = UserStorage;