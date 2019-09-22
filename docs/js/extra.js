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

window.MathJax = {
    tex2jax: {
        inlineMath: [ ["\\(","\\)"] ],
        displayMath: [ ["\\[","\\]"] ]
    },
    TeX: {
        TagSide: "right",
        TagIndent: ".8em",
        MultLineWidth: "85%",
        equationNumbers: {
            autoNumber: "AMS",
        },
        unicode: {
            fonts: "STIXGeneral,'Arial Unicode MS'"
        }
    },
    displayAlign: "left",
    showProcessingMessages: false,
    messageStyle: "none"
};
