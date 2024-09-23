// ban.js
const bannedIPs = ["123.456.789.0", "987.654.321.0"]; 

fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
        const userIP = data.ip;

        // If IP is banned
        if (bannedIPs.includes(userIP)) {
            // Redirect to /banned page
            window.location.href = "/banned";
        } else {
            // Continue loading the page
            console.log("IP not banned, allowing access.");
        }
    })
    .catch(error => console.error("Error fetching IP address:", error));
