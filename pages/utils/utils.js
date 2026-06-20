        
//toggle-handler
document.querySelectorAll('.formula-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.nextElementSibling.classList.toggle('open');
    });
});
//katex-math
document.addEventListener("DOMContentLoaded", () => {
    if (typeof renderMathInElement === "function") {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ]
        });
    } else {
        console.warn("KaTeX auto-render extension not found.");
    }
});