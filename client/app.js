const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;

const login = (e) => {
  e.preventDefault();
  const inputValue = userNameInput.value;
  if (!inputValue) {
    window.alert('You have to give your name');
  } else {
    userName = inputValue;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

loginForm.addEventListener('submit', (e) => login(e));

const addMessage = (user, message) => {
  const messageElement = document.createElement('li');
  messageElement.classList.add('message', 'message--received', user === userName ? 'message--self' : '');
  
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
  }
};

addMessageForm.addEventListener('submit', (e) => sendMessage(e))
