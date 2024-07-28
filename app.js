document.addEventListener('DOMContentLoaded', function() {
    function checkLogin() {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                window.location.href = 'index.html'; 
            }
        });
    }

    checkLogin();
});
