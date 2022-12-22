"use strict";

// 모듈
const express = require("express");
const dotenv = require("dotenv");
const logger = require("./src/config/logger")
const morgan = require("morgan");

const app = express();
dotenv.config();

// 라우팅
const home = require("./src/routes/home");  // index.js 를 가져와.
const accessLogStream = require("./src/config/log") 
            // morgan 을 통해 어느 폴더에 로그 파일을 남기고 싶은지 설정하는 로직.

// 앱 세팅
app.set("views", "./src/views");    // ./ 는 현재 디렉토리 위치를 뜻해.
    /*
    화면 view단에 해당하는 부분을 처리해줄 수 있는 view 엔진을 세팅.
    첫 인자는 "views" 라는 속성을 set 해주겠단 거고,
    두 번째 인자는 화면 view 를 관리해 줄 파일이 저장될 폴더의 경로 파라미터.
    */
app.set("view engine", "ejs") 
    /*
    ./views 안에 생성될 html의 코드들을 어떤 엔진으로 해석할지를 정해줄 수 있어.
    ejs 는 html 과 굉장히 흡사한 핸진.
    */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/src/public`))
app.use(morgan("dev")); // 개발용으로 콘솔에 출력하도록. 참고로 /register get 메소드, css, js 까지 총 3개를 띄움.
app.use(morgan("common", { stream: logger.stream}));    // morgan 미들웨어 등록. 그리고 log 파일에 로그를 남김.
                                    // stream, 즉 여길 거쳐서 온다는 것. 
                                    // 도중에 스트림을 지나면서 logger에서 지정해준 파일 저장이 발동.

app.use("/", home);


module.exports = app;