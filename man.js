const startManActions = () => {
  document.addEventListener("keydown", manMoving);
  document.addEventListener("mousemove", mousePosition);
  document.addEventListener("click", throwBall, true);
};

const stopManActions = () => {
  document.removeEventListener("keydown", manMoving);
  document.removeEventListener("mousemove", mousePosition);
  document.removeEventListener("click", throwBall, true);
};

//Движение человека
const manMoving = (e) => {
  switch (true) {
    case e.key === "w" ||
      e.key === "W" ||
      e.key === "Ц" ||
      e.key === "ц" ||
      e.key === "ArrowUp":
      if (parseInt(man.top) > 10) {
        topMove = 1;
      }
      break;

    case e.key === "s" ||
      e.key === "S" ||
      e.key === "ы" ||
      e.key === "Ы" ||
      e.key === "ArrowDown":
      if (parseInt(man.top) < parseInt(window.innerHeight) - 160) {
        topMove = -1;
      }
      break;
    default:
      break;
  }
};

// Расположение мышки
const mousePosition = (e) => {
  shot.mouseX = e.clientX;
  shot.mouseY = e.clientY;
};

// Запуск клубка при клике на мышь
const throwBall = () => {
  if (ball.opacity != 1 && shot.mouseX > 100) {
    ball.opacity = 1;
    shot.ballX = 100;
    shot.ballY = parseInt(man.top);
    ball.top = shot.ballY + "px";
    ball.left = shot.ballX + "px";
    const x = shot.mouseX - parseInt(man.left);
    const y = shot.mouseY - parseInt(man.top);
    const gipotenuza = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    shot.moveBallX = ballSpeed * (x / gipotenuza);
    shot.moveBallY = ballSpeed * (y / gipotenuza);
  }
};
