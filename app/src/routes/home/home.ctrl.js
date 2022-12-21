"use strict";

const home = (req, res) => {
    res.render("home/index")
    //  app.set("views", "./views") 로 폴더 경로를 설정해놨기 때문에 home/index 만 찾으면 돼. app.js 기준이야.
}

const login = (req, res) => {
    res.render("home/login");
}


module.exports = {
    home,
    login
}