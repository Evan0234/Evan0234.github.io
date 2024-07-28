document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
    });

    function checkLogin() {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                window.location.href = 'index.html'; // Redirect to login page
            } else {
                loadBannedIPs(); // Load banned IPs for the admin dashboard
            }
        });
    }

    checkLogin();
});
