const socket = io("http://localhost:3000");
const msgSpace = document.getElementById("msg-space");
const msgForm = document.getElementById("send-container");
const msgInput = document.getElementById("msg-input");

const name = prompt(`What Is You're Name...?`);
appendMsg("You Joined");
socket.emit("new-user", name);

socket.on("chat-msg", (data) => {
  appendMsg(`${data.name}: ${data.msg}`);
});

socket.on("user-connected", (name) => {
  appendMsg(`${name} Connected`);
});

socket.on("user-disconnected", (name) => {
  appendMsg(`${name} Disconnected`);
});

msgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = msgInput.value;
  appendMsg(`You: ${msg}`);
  socket.emit("send-chat-msg", msg);
  msgInput.value = "";
});

function appendMsg(msg) {
  const msgElement = document.createElement("div");
  msgElement.innerText = msg;
  msgSpace.append(msgElement);
}
