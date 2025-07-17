document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button[data-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-next');
      document.querySelectorAll('.quiz-step').forEach(s => s.style.display = 'none');
      document.getElementById(next).style.display = 'block';
    });
  });
});
