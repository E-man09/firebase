/**
 * @TODO get a reference to the Firebase Database object
 */
const database = firebase.database().ref();

/**
 * @TODO get const references to the elements
 */
const allMessages = document.getElementById('all-messages');
const usernameElem = document.getElementById('username');
const emailElem = document.getElementById('email');
const messageElem = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');

sendBtn.onclick = updateDB;

/**
 * @TODO create a function called updateDB
 */
function updateDB(event) {
  event.preventDefault();

  // Get current date and time
  const now = new Date();
  const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  const data = {
    USERNAME: usernameElem.value,
    EMAIL: emailElem.value,
    MESSAGE: messageElem.value,
    DATE: date,
    TIME: time,
  };

  database.push(data);

  messageElem.value = "";
}

/**
 * @TODO addMessageToBoard handler
 */
database.on('child_added', addMessageToBoard);

/**
 * @TODO create addMessageToBoard function
 */
function addMessageToBoard(rowData) {
  const data = rowData.val();
  let singleMessage = makeSingleMessageHTML(
    data.USERNAME,
    data.EMAIL,
    data.MESSAGE,
    data.DATE,
    data.TIME
  );
  allMessages.append(singleMessage);
}

/**
 * @TODO create makeSingleMessageHTML function
 */
function makeSingleMessageHTML(usernameTxt, emailTxt, messageTxt, dateTxt, timeTxt) {
  let parentDiv = document.createElement('div');
  parentDiv.className = 'single-message';

  // Username
  let usernameP = document.createElement('p');
  usernameP.className = 'single-message-username';
  usernameP.innerHTML = usernameTxt + ':';
  parentDiv.append(usernameP);

  // Email
  let emailP = document.createElement('p');
  emailP.className = 'single-message-email';
  emailP.innerHTML = emailTxt;
  parentDiv.append(emailP);

  // Message
  let messageP = document.createElement('p');
  messageP.innerHTML = messageTxt;
  parentDiv.append(messageP);

  // Date
  let dateP = document.createElement('p');
  dateP.className = 'single-message-date';
  dateP.innerHTML = dateTxt;
  parentDiv.append(dateP);

  // Time
  let timeP = document.createElement('p');
  timeP.className = 'single-message-time';
  timeP.innerHTML = timeTxt;
  parentDiv.append(timeP);

  return parentDiv;
}
