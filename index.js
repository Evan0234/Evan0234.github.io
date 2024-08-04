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
