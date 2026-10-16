(() => {
  const button = document.querySelector('.motion-toggle');
  const shell = document.querySelector('.visual-shell');
  if (!button || !shell) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  const en = document.documentElement.lang === 'en';
  const render = () => {
    shell.classList.toggle('motion-paused', paused);
    button.setAttribute('aria-pressed', String(paused));
    button.textContent = en
      ? (paused ? 'Play animation ▷' : 'Pause animation Ⅱ')
      : (paused ? '動きを再生 ▷' : '動きを一時停止 Ⅱ');
  };
  button.addEventListener('click', () => { paused = !paused; render(); });
  reduced.addEventListener('change', event => { paused = event.matches; render(); });
  render();
})();
