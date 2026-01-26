document.addEventListener('DOMContentLoaded', () => {
  const initSpinCoin = () => {
    const totalFrames = 31;
    let frame = 1;

    const spinSpeed = 10;
    const floatAmplitude = 8;
    const floatSpeed = 0.03;

    const coin = document.getElementById('coin');

    let spinCounter = 0;
    let t = 0;

    // Управление режимами
    let isFlying = false; // монета улетает вверх
    let running = true; // вращение работает всегда, пока running = true

    const animate = () => {
      if (running) {
        // --- Вращение всегда работает ---
        spinCounter++;
        if (spinCounter >= spinSpeed) {
          spinCounter = 0;
          frame++;
          if (frame > totalFrames) frame = 1;
          coin.src = `./app/img/base/coin/coin-${String(frame)}.png`;
        }

        // --- Покачивание только если не улетает ---
        if (!isFlying) {
          t += floatSpeed;
          const offsetY = Math.sin(t) * floatAmplitude;
          coin.style.transform = `translateY(${offsetY}px)`;
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Когда хотим скрыть монету
    window.hideCoin = () => {
      isFlying = true; // ⬅ выключаем покачивание (но не вращение)
      coin.style.transform = ''; // очищаем inline, чтобы CSS мог взять управление
      coin.classList.add('hidden');
    };
  };

  initSpinCoin();
});
