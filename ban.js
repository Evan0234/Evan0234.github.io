const bannedIPs = ['11.22.33.44', '987.654.321.000']; 

function redirectToBannedPage() {
    if (window.location.pathname !== '/banned.html') {
        window.location.href = '/banned.html';
    }
}


fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const userIP = data.ip;

        if (bannedIPs.includes(userIP)) {
            redirectToBannedPage();

            
            const observer = new MutationObserver(() => {
                if (window.location.pathname !== '/banned.html') {
                    redirectToBannedPage();
                }
            });

            observer.observe(document, { subtree: true, childList: true });
        }
    })
    .catch(error => {
        console.error('Error fetching the IP address:', error);
    });
