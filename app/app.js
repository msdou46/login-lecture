"use strict";

// 모듈
const express = require("express");
const app = express();

// 라우팅
const home = require("./src/routes/home");  // index.js 를 가져와.

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

app.use("/", home);


module.exports = app;