
export function getListRoles(headers) {
    fetch('http://127.0.0.1:8000/roles/my/',{
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                fillingRoles(data.roles)
            });
        } else {
            console.error('Error:', response.status, response.statusText)
        }
    })
}

function fillingRoles(roles) {
    const functionMenu = document.getElementById('function-menu');
    const ul = functionMenu.querySelector('ul');
  
    roles.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'dropdown';
  
      const div = document.createElement('div');
      div.className = 'list-item';
  
      const button = document.createElement('button');
      button.className = 'primary-list';
      button.textContent = item.role;
  
      // привязываем функцию toggleList к кнопке
      button.onclick = function() {
        toggleList(button);
      };
  
      div.appendChild(button);
  
      const ulCollapsible = document.createElement('ul');
      ulCollapsible.className = 'collapsible-content';
  
      item.functionality.forEach((func) => {
        const liFunc = document.createElement('li');
        const buttonFunc = document.createElement('button');
        buttonFunc.className = 'secondary-list';
        buttonFunc.textContent = func;
        liFunc.appendChild(buttonFunc);
        ulCollapsible.appendChild(liFunc);
      });
  
      div.appendChild(ulCollapsible);
      li.appendChild(div);
      ul.appendChild(li);
    });
  }
  
  function toggleList(button) {
    button.classList.toggle("active");
    const content = button.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  }