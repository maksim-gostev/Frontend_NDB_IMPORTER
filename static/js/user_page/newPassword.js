import { onSuccessAuthorization } from '../jwt.js';

export function updatePassword(form_submit){
    const accessJwtToken = localStorage.getItem('accessJwtToken');
    const refreshJwtToken = localStorage.getItem('refreshJwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': accessJwtToken,
        'refresh_token': refreshJwtToken
    }

    const addSubmitHandler = () => {
        const form = document.getElementById(form_submit);
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault(); // Предотвращаем стандартное поведение формы
            
                // Получаем данные из формы
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
            
                // Преобразуем данные в JSON
                const jsonData = JSON.stringify(data);
            
                // Отправляем данные на API
                fetch('http://127.0.0.1:8000/authorization/new_password/', {
                    method: 'POST',
                    headers: headers,
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
                    createNotification('Пароль изменен успешно!', 'success');
                    onSuccessAuthorization(data);
                  })
                  .catch(error => {
                    console.error('Ошибка:', error);
                    if (error.message.includes('401')) {
                      createNotification('Неверный старый пароль', 'error');
                    }
                    if (error.message.includes('400')) {
                      createNotification('Новые пароли не совпадают', 'error');
                    }
                  });
            });
        } // Закрывающая скобка для if (form)
    }; // Закрывающая скобка для addSubmitHandler

    // Используем MutationObserver для отслеживания появления элемента формы
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                addSubmitHandler();
            }
        });
    });

    // Наблюдаем за изменениями в DOM
    observer.observe(document.body, { childList: true, subtree: true });
} // Закрывающая скобка для updatePassword

function onStatus(data) {
    document.getElementById("Forbiden").innerHTML = data
}


function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    document.getElementById('notifications').appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 5000); // удалить уведомление через 5 секунд
  }
