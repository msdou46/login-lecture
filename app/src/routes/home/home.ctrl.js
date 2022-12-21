"use strict";

const users = {
    id: ["aaa", "bbb", "ccc"],
    psword: ["123", "1234", "12345"]
}

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
        const id = req.body.id;
        const psword = req.body.psword;

        if (users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            if (users.psword[idx] === psword) {
                return res.json({success: true, message:"로그인 성공."})
            }
        }

        return res.json({success: false, message: "로그인 실패!!!"})
                /*
                res.json 의 반환값은 promise. 
                기본 res의 반환값은 Reponse 스트림인데, json() 메서드를 통해서 
                Response(응답) 스트림을 읽을 수 있어.
                Response는 데이터가 모두 받아진 상태가 아냐.
                json() 으로 Response 스트림을 가져와 완료될 때까지 읽는거야.
                다 읽은 body의 텍스트를 promise 형태로 반환.
                */
    }
}


module.exports = {
    output,
    process
}