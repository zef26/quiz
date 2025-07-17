document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button[data-next]');
  const questions = document.querySelectorAll('.question');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const nextId = button.getAttribute('data-next');

      questions.forEach(q => q.style.display = 'none');

      const nextElement = document.getElementById(nextId);
      if (nextElement) {
        nextElement.style.display = 'block';
      }
    });
  });
});
