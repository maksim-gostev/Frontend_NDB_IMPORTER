import { onSuccessAuthorization } from '../jwt.js';
// JavaScript




export function getUserData(headers) {
  fetch('http://127.0.0.1:8000/user/my/', {
    method: 'GET',
    headers: headers
})
.then(response => {
  if (response.ok) {
    response.json().then(data => {      
      fillingUserData(data);
      onSuccessAuthorization(data);
    });
  } else {
    console.error('Error:', response.status, response.statusText);
  }
})}


function fillingUserData(data) {
  document.getElementById("user_data").innerHTML = `<h2>${data.first_name} ${data.username}</h2>`
}