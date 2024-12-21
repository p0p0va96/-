document.addEventListener('DOMContentLoaded', function() {
  const music = document.getElementById('background-music');
  const toggleButton = document.getElementById('toggle-music');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const volumeSlider = document.getElementById('volume-slider');

  let isPlaying = true;

  // Встановлюємо початкову гучність відповідно до повзунка
  music.volume = volumeSlider.value;

  // Спроба відтворити музику (може бути заблоковано браузером)
  music.play().then(() => {
    // Відтворення успішно
    toggleButton.setAttribute('aria-label', 'Вимкнути музику');
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';
  }).catch(error => {
    console.warn('Автозапуск музики заблоковано браузером.', error);
    toggleButton.setAttribute('aria-label', 'Увімкнути музику');
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
    isPlaying = false;
  });

  // Обробник кліку на кнопку контролю музики
  toggleButton.addEventListener('click', function() {
    if (isPlaying) {
      music.pause();
      toggleButton.setAttribute('aria-label', 'Увімкнути музику');
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
    } else {
      music.play().then(() => {
        toggleButton.setAttribute('aria-label', 'Вимкнути музику');
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
      }).catch(error => {
        console.error('Не вдалося відтворити музику:', error);
      });
    }
    isPlaying = !isPlaying;
  });

  // Обробник зміни гучності через повзунок
  volumeSlider.addEventListener('input', function() {
    music.volume = volumeSlider.value;
  });
});