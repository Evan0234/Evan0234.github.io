const bannedIPs = ['23.27.114.89', '987.654.321.000']; // Example banned IPs

function redirectToBannedPage() {
    if (window.location.pathname !== '/banned.html') {
        window.location.href = '/banned.html';
    }
}

// Fetch the user's IP address
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const userIP = data.ip;

        if (bannedIPs.includes(userIP)) {
            redirectToBannedPage();

            // Monitor the URL changes and redirect if necessary
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
