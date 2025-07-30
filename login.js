
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  const validUsers = {
    'Cole243': 'password1',
    'Test123': 'password2'
  };

  if (validUsers[user] && validUsers[user] === pass) {
    window.location.href = 'portal.html';
  } else {
    document.getElementById('loginStatus').innerText = 'Invalid login.';
  }
});
