const bannedIPs = ["123.123.123.123", "234.234.234.234"]; // Add IPs you want to ban

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const userIP = data.ip;
    if (bannedIPs.includes(userIP)) {
      window.location.href = '/banned';
    }
  });

window.addEventListener('hashchange', () => {
  const userIP = data.ip;
  if (bannedIPs.includes(userIP)) {
    window.location.href = '/banned';
  }
});
