// Главный рендер

let render = null;

const startRender = () => {
  render = setInterval(() => {
    manRender();
    for (let i = 0; i < cats.length; i += 1) {
      renderOfCats(cats[i]);
    }
    for (let i = 0; i < cats.length; i += 1) {
      spawnOfCats(cats[i]);
    }
    ballMoving();
    renderCatBalls();
  }, 4);
};

const stopRender = () => {
  clearInterval(render);
};

// Рендер котов
const renderOfCats = (cat) => {
  for (let i = 0; i < cat.count; i += 1) {
    catMoving(i, cat);
    controlIsCatCame(i, cat);
    isCatShot(i, cat);
    /* if (isBreake) {isBreake = false; break} */
  }
};

// Движение врагов
const catMoving = (i, cat) => {
  (cat.x[i] -= cat.speed * turbo),
    (document.getElementById(`${cat.name}${i}`).style.left = cat.x[i] + "px");
  document.getElementById(`${cat.name}${i}`).style.top = cat.y[i] + "px";
};

//Проверка не дошел ли враг

const controlIsCatCame = (i, cat) => {
  if (cat.x[i] <= 100) {
    gameOver();
  }
};

//Попадание клубком по врагу

const isCatShot = (i, cat) => {
  if (
    parseInt(ball.left) >= cat.x[i] &&
    parseInt(ball.left) <= cat.x[i] + (window.innerWidth / 1000) * 30 &&
    parseInt(ball.top) >= cat.y[i] - (window.innerWidth / 1000) * 20 &&
    parseInt(ball.top) <= cat.y[i] + (window.innerWidth / 1000) * 60
  ) {
    if (cat.type === "flag") {
      turbo = turbo / 1.2;
    }
    if (cat.hp === 1) {
      catDefeted(i, cat);
    } else if (cat.hp === 2) {
      let lostItems = lostItemsEl.innerHTML || "";
      lostItems =
        lostItems +
        `<img src="${cat.item}" style="
  left:${cat.x[i]}px; top:${cat.y[i]}px; position: absolute; opacity:1 ; z-index: 2;width: 10vw;">`;
      lostItemsEl.innerHTML = lostItems;
      if (cats.filter((i) => i.name === "commonCat").length != 0) {
        const index = cats.findIndex((findI) => findI.name === "commonCat");
        letSpawnOfCats(cats[index], cat.x[i], cat.y[i]);
      } else {
        cats.push({
          ...catsProps[0],
          count: 0,
          x: [],
          y: [],
        });
        letSpawnOfCats(cats[cats.length - 1], cat.x[i], cat.y[i]);
      }
      catDefeted(i, cat);
    }
  }
};

//Когда враг побежден:
const catDefeted = (i, cat) => {
  document.getElementById(`${cat.name}`).innerHTML = "";
  cat.x.splice(i, 1);
  cat.y.splice(i, 1);
  cat.count = cat.count - 1;
  ball.left = "0";
  ball.opacity = "0";
  isWinLevel();

  for (let a = 0; a < cat.count; a += 1) {
    let element = document.getElementById(cat.name).innerHTML;
    document.getElementById(cat.name).innerHTML =
      element +
      `<img  id="${cat.name}${a}" src="${cat.png}" style="left:${cat.x[a]}; top:${cat.y[a]}; position: absolute; opacity:1 ; z-index: 2; width: 10vw; ">`;
  }
};

//Проверка победы
const isWinLevel= ()=> {
  if (
    cats.filter((i) => i.count).length == 0 &&
    cats.filter((i) => i.levelCount).length == 0
  ) {
    level += 1;
    letLever();
  }
}

// Проверка условия появления новых врагов
const spawnOfCats = (cat) => {
  cat.spawnTimer += 1;
  if (cat.spawnTimer >= cat.spawnOfCat && cat.levelCount) {
    cat.spawnTimer = 0;
    cat.levelCount -= 1;
    let y = 20 + Math.random() * window.innerHeight * 0.8;
    letSpawnOfCats(cat, 1000, y);
    letCatBalls(cat);
  }
};

// Увеличение числа врагов
const letSpawnOfCats = (cat, catX, catY) => {
  if (cat.type === "flag") {
    turbo = turbo * 1.2;
  }
  cat.count += 1;
  cat.x.push(catX);
  cat.y.push(catY);
  let element = document.getElementById(cat.name).innerHTML;
  document.getElementById(cat.name).innerHTML =
    element +
    `<img  id="${cat.name}${cat.count - 1}" src="${cat.png}" style="
  left:${cat.x[cat.count - 1]}px; 
  top:${cat.y[cat.count - 1]}px;
  position: absolute; opacity:1 ; z-index: 2; width: 10vw;">`;
};

// Движение клубка
const ballMoving = () => {
  if (shot.ballX > 1000 || shot.ballY < 0 || shot.ballY > window.innerHeight) {
    ball.opacity = 0;
  } else if (ball.opacity == 1) {
    shot.ballX += shot.moveBallX;
    shot.ballY += shot.moveBallY;
    ball.left = shot.ballX + "px";
    ball.top = shot.ballY + "px";
  }
};

//Выстрел клубком при появлении нового врага
const letCatBalls = (cat) => {
  catBalls.x.push(cat.x[cat.x.length - 1]);
  catBalls.y.push(cat.y[cat.y.length - 1]);
  catBalls.HTML =
    catBalls.HTML +
    `<img  id="CatBalls${catBalls.x.length - 1}" src="${
      catBalls.png
    }" style="left:${catBalls.x[catBalls.x.length - 1]}px; top:${
      catBalls.y[catBalls.y.length - 1]
    }px; position: absolute; opacity:1 ; z-index: 2; width: 3vw; ">`;
  document.getElementById("catBalls").innerHTML = catBalls.HTML;
};

//Рендер котоклубков
const renderCatBalls = () => {
  for (i = 0; i < catBalls.x.length; i += 1) {
    catBalls.x[i] -= catBalls.speed;
    document.getElementById(`CatBalls${i}`).style.left = catBalls.x[i] + "px";
    document.getElementById(`CatBalls${i}`).style.top = catBalls.y[i] + "px";
    isManShot(i);
  }
};

//Попадание котоклубком по человеку
const isManShot = (index) => {
  if (
    catBalls.x[index] <= 130 &&
    catBalls.x[index] >= 100 &&
    parseInt(catBalls.y[index]) >=
      parseInt(man.top) - 10 * (window.innerWidth / 1000) &&
    parseInt(catBalls.y[index]) <=
      parseInt(man.top) + 70 * (window.innerWidth / 1000)
  ) {
    gameOver();
  }
};

//Рендер человека

const manRender = () => {
  if (topMove == -1) {
    topMove = 0;
    const position = parseInt(man.top);
    man.top = position + 7 + "px";
  }
  if (topMove == 1) {
    topMove = 0;
    const position = parseInt(man.top);
    man.top = position - 7 + "px";
  }
};

//Проигрыш
const gameOver = () => {
  stopRender();
  stopManActions();
  const menuEl = document.getElementById("modal");
  menuEl.style = "display:flex; font-size:30px; font-weight:500";
  menuEl.innerHTML = `GAME OVER`;
  setTimeout(() => {
    setBasicData();
    startMenu();
  }, 2000);
};
