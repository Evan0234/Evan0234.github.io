document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        body.classList.toggle('light');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                window.location.href = '/dashboard';
            })
            .catch((error) => {
                loginError.textContent = error.message;
            });
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user && window.location.pathname === '/dashboard') {
            document.getElementById('dashboardMessage').style.display = 'block';
        } else if (!user && window.location.pathname === '/dashboard') {
            window.location.href = '/login';
        }
    });
});
