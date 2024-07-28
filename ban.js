// ban.js
const bannedIPs = ["123.456.789.0", "987.654.321.0"]; 

fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
        if (bannedIPs.includes(data.ip)) {
            window.location.href = "/banned";
        }
    })
    .catch(error => console.error("Error fetching IP address:", error));
