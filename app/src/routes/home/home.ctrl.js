"use strict";

const User = require("../../models/User");

const output = {
    home: (req, res) => {
        res.render("home/index")
        //  app.set("views", "./views") 로 폴더 경로를 설정해놨기 때문에 home/index 만 찾으면 돼. app.js 기준이야.
    },
    
    login: (req, res) => {
        res.render("home/login");
    }
}

const process = {
    login: (req, res) => {
        const user = new User(req.body);
        const response = user.login();
        return res.json(response);
    }
}


module.exports = {
    output,
    process
}