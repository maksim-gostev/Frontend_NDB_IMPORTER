import { onSuccessAuthorization } from './jwt.js';
  
  
export function authorization(form_submit) {
    // Получаем форму
    const form = document.getElementById(form_submit);
  
    // Добавляем обработчик события submit на форму
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Предотвращаем стандартное поведение формы
  
      // Получаем данные из формы
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
  
      // Преобразуем данные в JSON
      const jsonData = JSON.stringify(data);
  
      // Отправляем данные на API
      fetch('http://127.0.0.1:8000/authorization/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      })
     .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
      })
     .then(data => {
        // Здесь можно вызвать функцию, если авторизация прошла успешно
        onSuccessAuthorization(data);
        transitionToUser();

      })
     .catch(error => {
        console.error('Ошибка:', error);
        if (error.message.includes('401')) {
          // Здесь можно вызвать функцию, если произошла ошибка 404
          on401ErrorAuthor();
        }
        if (error.message.includes('403')) {
          // Здесь можно вызвать функцию, если произошла ошибка 403
          on403ErrorAuthor()
        }
      });
    });
  }
  
  // Функция, которая будет вызвана в случае успешной авторизации
  function transitionToUser() {
    window.location.href = "templates/user_index.html";
    // Здесь можно выполнить какие-либо действия после успешной авторизации
  }
  
  function on403ErrorAuthor() {
    const Forbiden = "<p style='color: brown;'> Ваша учётная запись заблокирована обратитесь к админестратору </p>"
    document.getElementById("Forbiden").innerHTML = Forbiden
    document.getElementById("notFaund").innerHTML = ''
  }

  // Функция, которая будет вызвана в случае ошибки 404
  function on401ErrorAuthor() {
    const notFaund = "<p style='color: brown;'> Не верный логин или пороль </p>"
    document.getElementById("notFaund").innerHTML = notFaund
    document.getElementById("Forbiden").innerHTML = ''
    // Здесь можно выполнить какие-либо действия в случае ошибки 404
  }
