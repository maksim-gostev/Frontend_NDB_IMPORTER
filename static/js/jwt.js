export function onSuccessAuthorization(data) {
    localStorage.setItem('accessJwtToken', `${data.token_type} ${data.access_token}`);
    localStorage.setItem('refreshJwtToken', `${data.token_type} ${data.refresh_token}`);
    
    // Здесь можно выполнить какие-либо действия после успешной авторизации
  }