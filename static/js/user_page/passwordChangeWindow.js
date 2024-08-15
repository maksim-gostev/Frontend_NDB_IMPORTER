// function passwordChangeWindow(){
    // const h2Element = document.querySelector('h2'); // выбираем элемент <h2>
    
    // h2Element.addEventListener('click', function() {
      // код, который будет выполнен при клике на <h2>
    //   console.log('Клик на <h2>');
      // вызываем функцию, которую вы хотите выполнить
    //   openWindow();
    // });
//   }

export function passwordChangeWindow() {
    const userDataElement = document.getElementById('user_data');
    const observer = new MutationObserver(() => {
      const h2Element = userDataElement.querySelector('h2');
      if (h2Element) {
        h2Element.addEventListener('click', () => {
          openWindow();
        });
        observer.disconnect();
      }
    });
    observer.observe(userDataElement, { childList: true });
  };
  
  function openWindow(){
    const workspace = document.getElementById("workspace");
    workspace.innerHTML = `
      <div>
      <div id="notifications"></div>
        <form id="newPasswordForm" method="post">
          <label for="old_password">Старый пароль</label><br>
          <input type="text" id="old_password" name="old_password" placeholder="Старый пароль" autofocus autocomplete="on"><br>
          <label for="new_password">Новый пароль</label><br>
          <input type="password" id="new_password" name="new_password" placeholder="Новый пароль" required><br>
          <label for="new_password2">Повторите пароль</label><br>
          <input type="password" id="new_password2" name="new_password2" placeholder="Повторите пароль" required><br>
          <p id="Forbiden"></p>
          <button type="submit">Ввод</button><br>
        </form>
      </div>
    `;
  };