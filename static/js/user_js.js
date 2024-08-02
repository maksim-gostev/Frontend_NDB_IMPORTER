// JavaScript
  function toggleList(button) {
    // здесь код, который будет выполняться с кнопкой
    button.classList.toggle("active");
    var content = button.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }
