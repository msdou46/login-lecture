"use strict";

const id = document.querySelector("#id");
const psword = document.querySelector("#psword");
const loginBtn = document.querySelector("#button");

const login = () => {

    if(!id.value) return alert("아이디를 입력해 주세요!");
    if (!psword.value) return alert("비밀번호를 입력해 주세요!");

    const req = {
        id: id.value,
        psword: psword.value
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href="/";
            } else {
                if (res.err) return alert(res.err);
                return alert(res.message);
            }
        })
        .catch ((err) => {
            console.error(new Error("로그인 중 에러 발생"))
        })
}

loginBtn.addEventListener("click", login);



