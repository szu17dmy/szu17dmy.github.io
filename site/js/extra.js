window.addEventListener('load', function () {
    let mdColorPrimary = localStorage.getItem("data-md-color-primary");
    if (mdColorPrimary) {
        document.body.setAttribute('data-md-color-primary', mdColorPrimary);
    }
    let mdColorAccent = localStorage.getItem('data-md-color-accent');
    if (mdColorAccent) {
        document.body.setAttribute('data-md-color-accent', mdColorAccent);
    }
}, false);
