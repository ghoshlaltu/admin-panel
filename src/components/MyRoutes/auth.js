export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // Add your own logic to validate the token's authenticity and expiration
    return token !== null;
  };