"use strict"

const e = require("express");
const db = require("../config/db")

class UserStorage {
    // 로그인 시 DB에서 유저 정보를 가져오는 메소드.
    static getUserInfo (id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?;"
            db.query(query, [id], (err, data) => { // [{}] 
                if (err) reject(`${err}`);
                else resolve(data[0]);
            });
        })
    }
    // 회원가입 시 유저 정보를 DB에 저장.
    static async save (userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, psword) VALUES (?, ?, ?);"
            db.query(query, [userInfo.id, userInfo.name, userInfo.psword], (err) => { 
                if (err) reject(`${err}`);
                else resolve({success: true});
            });
        })
    }
}


module.exports = UserStorage;