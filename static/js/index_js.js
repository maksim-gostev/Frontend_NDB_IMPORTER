function authorization(form_submit){
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
  .then(response => response.json())
  .then(data => {
    console.log('Ответ от API:', data);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
}
);
}