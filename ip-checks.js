// List of banned IPs
const bannedIPs = [
    '23.27.114.89',
    '111.222.333.444'
];

async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching the IP:', error);
        return null;
    }
}

// Function to check if the IP is banned
async function checkIP() {
    const userIP = await getUserIP();
    if (userIP && bannedIPs.includes(userIP)) {
        alert('Your IP is banned. You will be redirected.');
        window.location.href = '/error.html';  
    }
}

/
checkIP();
