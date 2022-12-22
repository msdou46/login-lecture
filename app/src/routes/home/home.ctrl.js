"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");

const output = {    // get 에 해당
    home: (req, res) => {
        logger.info(`GET / 200 "홈 화면으로 이동"`)
        res.render("home/index")
        //  app.set("views", "./views") 로 폴더 경로를 설정해놨기 때문에 home/index 만 찾으면 돼. app.js 기준이야.
    },
    login: (req, res) => {
        logger.info(`GET /login 200 "로그인 화면으로 이동"`)
        res.render("home/login");
    },
    register: (req, res) => {
        logger.info(`GET /register 200 "회원가입 화면으로 이동"`)
        res.render("home/register")
    }
}

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        if (response.err) {
            logger.error(
                `POST /login 200 "success: ${response.success}, ${response.err}"`
            );
        } else {
            logger.info(
                `POST /login 200 "success: ${response.success}, message: ${response.message}"`
            );
        }
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        if (response.err) {
            logger.error(
                `POST /register 200 "success: ${response.success}, ${response.err}"`
            );
        } else {
            logger.info(
                `POST /register 200 "success: ${response.success}, message: ${response.message}"`
            );
        }
        return res.json(response);
    }
}


module.exports = {
    output,
    process
}