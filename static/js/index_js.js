
  function authorization(form_submit) {
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
        console.log('Ответ от API:', data);
        // Здесь можно вызвать функцию, если авторизация прошла успешно
        onSuccessAuthorization(data);
      })
     .catch(error => {
        console.error('Ошибка:', error);
        if (error.message.includes('404')) {
          // Здесь можно вызвать функцию, если произошла ошибка 404
          on404ErrorAuthor();
        }
      });
    });
  }
  
  // Функция, которая будет вызвана в случае успешной авторизации
  function onSuccessAuthorization(data) {
    console.log('Авторизация прошла успешно!');
    // Здесь можно выполнить какие-либо действия после успешной авторизации
  }
  
  // Функция, которая будет вызвана в случае ошибки 404
  function on404ErrorAuthor() {
    const notFaund = "<p style='color: brown;'> Не верный логин </p>"
    console.log('Ошибка 404: не найден ресурс авторизации');
    document.getElementById("notFaund").innerHTML = notFaund
    // Здесь можно выполнить какие-либо действия в случае ошибки 404
  }
function fetchAndInsertHTML(url, elementId) {
  fetch(url)
    .then(response => response.text())
    .then(html => document.getElementById(elementId).innerHTML = html)
    .catch(error => console.error(error));
}