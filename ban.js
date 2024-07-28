document.addEventListener('DOMContentLoaded', function() {
    const ipBanTableBody = document.getElementById('ipBanTableBody');
    const banForm = document.getElementById('banForm');
    const ipAddressInput = document.getElementById('ipAddress');
    const banReasonInput = document.getElementById('banReason');

    // Initialize Firebase
    const app = firebase.app();
    const database = firebase.database();

    function loadBannedIPs() {
        database.ref('bannedIPs').once('value', snapshot => {
            const bannedIPs = snapshot.val() || {};
            ipBanTableBody.innerHTML = '';
            Object.keys(bannedIPs).forEach((key, index) => {
                const ban = bannedIPs[key];
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${ban.ip}</td>
                    <td>${ban.reason}</td>
                    <td class="actions">
                        <button class="unban" data-key="${key}">Unban</button>
                    </td>
                `;
                ipBanTableBody.appendChild(row);

                row.querySelector('.unban').addEventListener('click', () => {
                    database.ref('bannedIPs').child(key).remove();
                    loadBannedIPs();
                });
            });
        });
    }

    banForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const ip = ipAddressInput.value;
        const reason = banReasonInput.value;

        const newBanRef = database.ref('bannedIPs').push();
        newBanRef.set({ ip, reason });

        loadBannedIPs();
        banForm.reset();
    });

    function checkIPBan() {
        database.ref('bannedIPs').once('value', snapshot => {
            const bannedIPs = snapshot.val() || {};
            const currentIP = '127.0.0.1'; // Placeholder for real IP check

            if (Object.values(bannedIPs).some(ban => ban.ip === currentIP)) {
                window.location.href = 'banned.html';
            }
        });
    }

    checkIPBan();
    loadBannedIPs();
});
