document.addEventListener('DOMContentLoaded', function() {
    const banReasonElement = document.getElementById('banReason');

    // Initialize Firebase
    const app = firebase.app();
    const database = firebase.database();

    function checkIPBan() {
        const currentIP = '127.0.0.1'; 
        database.ref('bannedIPs').once('value', snapshot => {
            const bannedIPs = snapshot.val() || {};
            const ban = Object.values(bannedIPs).find(ban => ban.ip === currentIP);

            if (ban) {
                if (banReasonElement) {
                    banReasonElement.textContent = `Reason: ${ban.reason}`;
                }
                window.location.href = 'banned.html';
            }
        });
    }

    if (window.location.pathname.endsWith('banned.html')) {
        checkIPBan();
    }
});
