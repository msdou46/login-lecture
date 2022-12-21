"use strict"

const fs = require("fs").promises;
        // fs.readFile 는 promise 를 반환하게 될 거야.

class UserStorage {

    static #getUserInfo (data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const userInfo = Object.keys(users).reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo
    }

    static #getUsers (data, isAll, fields) {
        const users = JSON.parse(data);
        if (isAll) return users;

        const newUsers = fields.reduce((newUsers, field) => {   // 전체 데이터 중 일부 필드만 가져오고 싶을 때.
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {}); // 전체 데이터 타입. 객체로 반환한다.
        return newUsers;
    }
    
    static getUsers (isAll, ...fields) {
        return fs.readFile("./src/databases/users.json")
            .then((data) => {
                return this.#getUsers(data, isAll, fields);
            })
            .catch(console.error);
    }

    static getUserInfo (id) {
        return fs.readFile("./src/databases/users.json")
            .then((data) => {
                return this.#getUserInfo(data, id);
            })
            .catch(console.error);
    }

    static async save (userInfo) {
        const users = await this.getUsers(true);
        
        if(users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다.";
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        // 데이터 저장. 그냥 저장하면 기존의 데이터들을 전부 덮어 씌워 버리기 때문에, 일단 모든 데이터를 가져와서 
        // 새로 추가되는 유저 정보를 더한 다음에, 그렇게 완성된 총 데이터를 다시 파일에 넣어야 해.
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return { success: true };
    }
}


module.exports = UserStorage;