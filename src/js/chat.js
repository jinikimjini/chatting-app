"use strict"//자바스크립트 오류 줄이기 (프론트 페이지)
const socket = io(); // 함수호출시 소켓에 클라이언트 소켓 io가 담김
const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress",(event)=>{
    if(event.keyCode === 13){
        send();
    }
})

function send(){
    const param = {
        name : nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting",param) //소켓으로 보냄 사용자가 쓴내용
}

sendButton.addEventListener("click",send);// 전송버튼 클릭시 send 함수 실행



socket.on("chatting",(data)=>{//소켓데이터 가져옴
    const {name, msg, time} = data; //넘어온 데이터를 쪼개서 넣어줌.
    const item = new LiModel(name, msg, time); // li 모델을 인스턴스화 시켜줌 , 초기화
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight); //현재 스크롤 위치를 읽어서 그곳으로 이동시킴


})

function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>{
        const li = document.createElement("li")
        li.classList.add(nickname.value === this.name ? "sent": "received")
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://placeimg.com/50/50/any" alt="any"/>
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
    }
}