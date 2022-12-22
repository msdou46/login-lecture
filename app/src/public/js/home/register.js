"use strict";

const id = document.querySelector("#id");
const name = document.querySelector("#name")
const psword = document.querySelector("#psword");
const confirmPsword = document.querySelector("#confirm-psword");
const registerBtn = document.querySelector("#button");


const register = () => {

    if(!id.value) return alert("아이디를 입력해 주세요!");
    if (psword.value !== confirmPsword.value) {
        return alert("비밀번호가 일치하지 않습니다.");
    }

    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href="/login";
            } else {
                if (res.err) return alert(res.err);
            }
        })
        .catch ((err) => {
            console.error(new Error("회원가입 중 에러 발생"))
        })
}

registerBtn.addEventListener("click", register);



