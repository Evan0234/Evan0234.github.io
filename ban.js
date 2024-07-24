const bannedIPs = ['123.456.789.000', '987.654.321.000']; // Example banned IPs

// Fetch the user's IP address
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const userIP = data.ip;

        if (bannedIPs.includes(userIP)) {
            window.location.href = '/banned.html'; // Redirect to a banned page
        }
    })
    .catch(error => {
        console.error('Error fetching the IP address:', error);
    });
