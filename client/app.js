const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content))
socket.on('leave', ({name}) => { 
  console.log(`${name} has left`);
  const content = `${name} has left the conversation`;
  addMessage('Chat Bot', content);
});
socket.on('join', ({name}) => {
  console.log(`${name} has joined`);
  const content = `${name} has joined the conversation`;
  addMessage('Chat Bot', content);
});

let userName;

const login = (e) => {
  e.preventDefault();
  const inputValue = userNameInput.value;
  if (!inputValue) {
    window.alert('You have to give your name');
  } else {
    socket.emit('login', {name: inputValue});
    socket.once('login', () => {
      userName = inputValue;
      loginForm.classList.remove('show');
      messagesSection.classList.add('show');
    });
  }
};

loginForm.addEventListener('submit', (e) => login(e));

const addMessage = (user, message) => {
  const messageElement = document.createElement('li');
  messageElement.classList.add('message', 'message--received');
  if (user === userName) {
    messageElement.classList.add('message--self');
  }
  
  const header = document.createElement('h3');
  header.textContent = user === userName ? 'You' : user;
  header.classList.add('message__author');
  
  const content = document.createElement('div')
  content.textContent = message;
  content.classList.add('message__content');
  
  messageElement.append(header, content);
  messagesList.appendChild(messageElement);
};

const sendMessage = (e) => {
  e.preventDefault();
  const inputValue = messageContentInput.value;
  if (!inputValue) {
    window.alert('You have to enter your message');
  } else {
    addMessage(userName, inputValue);
    socket.emit('message', { author: userName, content: inputValue })
    messageContentInput.value = '';
  }
};

addMessageForm.addEventListener('submit', (e) => sendMessage(e))
