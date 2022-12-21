"use strict";

const id = document.querySelector("#id");
const psword = document.querySelector("#psword");
const loginBtn = document.querySelector("button");

const login = () => {
    const req = {
        id: id.value,
        psword: psword.value
    };

    console.log(JSON.stringify(req))
}

loginBtn.addEventListener("click", login);



