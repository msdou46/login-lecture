"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");

const output = {    // get 에 해당
    home: (req, res) => {
        logger.info(`GET / 304 "홈 화면으로 이동"`)
        res.render("home/index")
        //  app.set("views", "./views") 로 폴더 경로를 설정해놨기 때문에 home/index 만 찾으면 돼. app.js 기준이야.
    },
    login: (req, res) => {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`)
        res.render("home/login");
    },
    register: (req, res) => {
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`)
        res.render("home/register")
    }
}

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200
        }
        log(response, url);
        return res.status(url.status).json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        const url = {
            method: "POST",
            path: "/register",
            status: response.err ? 400 : 201        // 새로운 데이터가 생성되는 것이라면 201을 반환.
        }
        log(response, url);
        return res.status(url.status).json(response);
    }
}


module.exports = {
    output,
    process
}

const log = (response, url) => {
    if (response.err) {
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.err}`
        );
    } else {
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.message || ''}`
        );
    }
}