const setBasicData = () => {
  document.getElementById("catBalls").innerHTML = "";
  for (let i = 0; i < cats.length; i += 1) {
    document.getElementById(cats[i].name).innerHTML = "";
  }
  cats = [];
  catBalls = {};
  turbo = 1;
  lostItemsEl.innerHTML = "";
  ball.opacity = 0;
};

const letLever = () => {
  stopRender();
  stopManActions();
  const menuEl = document.getElementById("modal");
  menuEl.style = "display:flex; font-size:30px; font-weight:500";

  if (level < 6) {
    if (level == 1) {
      menuEl.innerHTML = `Уровень  ${level}`;
    } else {
      menuEl.innerHTML = `Уровень пройден! <br/> <br/> Уровень ${level}`;
    }

    setTimeout(() => {
      menuEl.style = "display:none";
      setBasicData();
      setlevelEnemies(levelEnemies());
      startRender();
      startManActions();
    }, 2000);
  }

  if (level == 6) {
    menuEl.innerHTML = `Ура, вы победили!`;
    setTimeout(() => {
      menuEl.style = "display:none";
      setBasicData();
      startMenu();
    }, 2000);
  }
};
const setlevelEnemies = (enemies) => {
  for (let i = 0; i < enemies.length; i += 1) {
    for (let iSet = 0; iSet < catsProps.length; iSet += 1) {
      if (enemies[i].name === catsProps[iSet].name) {
        cats = [
          ...cats,
          {
            ...catsProps[iSet],
            levelCount: enemies[i].levelCount,
            spawnOfCat: enemies[i].spawnOfCat,
            x: [],
            y: [],
            alive:[],
            count: 0,
            spawnTimer: 0,
          },
        ];
      }
    }
  }
  catBalls = {
    x: [],
    y: [],
    HTML: "",
    png: "./img/catballs.png",
    speed: 0.9,
  };
};

const levelEnemies = () => {
  switch (true) {
    case level == 1:
      return [
        { name: "commonCat", levelCount: 2, spawnOfCat: 300 },
        { name: "helmetCat", levelCount: 2, spawnOfCat: 200 },
      ];

    case level == 2:
      return [
        { name: "commonCat", levelCount: 3, spawnOfCat: 300 },
        { name: "helmetCat", levelCount: 2, spawnOfCat: 200 },
        { name: "superCat", levelCount: 1, spawnOfCat: 500 },
      ];

    case level == 3:
      return [
        { name: "commonCat", levelCount: 3, spawnOfCat: 200 },
        { name: "helmetCat", levelCount: 3, spawnOfCat: 200 },
        { name: "superCat", levelCount: 2, spawnOfCat: 500 },
        { name: "motoCat", levelCount: 1, spawnOfCat: 500 },
      ];

    case level == 4:
      return [
        { name: "commonCat", levelCount: 3, spawnOfCat: 500 },
        { name: "helmetCat", levelCount: 3, spawnOfCat: 400 },
        { name: "superCat", levelCount: 1, spawnOfCat: 500 },
        { name: "motoCat", levelCount: 1, spawnOfCat: 500 },
        { name: "flagCat", levelCount: 1, spawnOfCat: 1000 },
      ];

    case level == 5:
      return [
        { name: "commonCat", levelCount: 5, spawnOfCat: 500 },
        { name: "helmetCat", levelCount: 5, spawnOfCat: 700 },
        { name: "superCat", levelCount: 2, spawnOfCat: 600 },
        { name: "motoCat", levelCount: 3, spawnOfCat: 900 },
        { name: "flagCat", levelCount: 2, spawnOfCat: 1000 },
      ];

    default:
      return null;
  }
};
