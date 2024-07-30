function headertHTML(elementId, url) {
    const html = `<img src=${url}  alt="Народный Довкерительный Банк" style="width:400px; height: 80px;"><hr></hr>`
    document.getElementById(elementId).innerHTML = html
  }