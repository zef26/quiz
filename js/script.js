function nextStep(nextId) {
    const current = document.querySelector('.question:not([style*="display: none"])');
    if (current) current.style.display = 'none';

    const next = document.getElementById(nextId);

    if (next) {
        if (next.classList.contains('result-block')) {
            next.style.display = 'block';
            setTimeout(() => next.classList.add('show'), 50);
        } else {
            next.style.display = 'block';
        }
        next.scrollIntoView({ behavior: 'smooth' });
    }
}
