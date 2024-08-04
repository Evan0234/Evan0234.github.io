<head>
  <script src="https://www.google.com/recaptcha/enterprise.js?render=6LfC9R4qAAAAABWgT9TA2-xGc2gbwPTPQEp-NYfD"></script>
 event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'dashboard.html';
        })
        .catch(error => {
            alert('Invalid credentials!');
        });
});
</head>document.getElementById('loginForm').addEventListener('submit', function(event) {
