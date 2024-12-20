const man = document.getElementById("id-man").style;
const ball = document.getElementById("id-ball").style;
const lostItemsEl = document.getElementById("lostItems");

//Текущий уровень
let level = 0;

//Позволяет узнать о движение человека во время рендеринга
let topMove=0;

//Объект, содержащий всю информацию о брошенном мяче
const shot = {
  ballX: null,
  ballY: null,
  moveBallX: null,
  moveBallY: null,
  mouseX: 1,
  mouseY: 1,
};

// Cкорость движения противников. Задается в начале каждого раунда. Может пропорционально меняться при появлении некоторых врагов.
let turbo = 1;

// скорость выпущенного мяча
const ballSpeed = 2;

// Массив, создающийся заново при старте нового уровня в level.js и содержащий информацию о противниках. Каждый объект массива содежит всю информацию об отдельном виде противника.
let cats = [
];

// Объект, сожержащий информацию о шарах, выпущенных противниками
let catBalls = {
};

// Базовые характеристики противников
const catsProps = [
  { name: "commonCat", speed: 0.3, hp: 1, png: "./img/cat.png" },
  {
    name: "helmetCat",
    speed: 0.2,
    hp: 2,
    png: "./img/cat_v_kaske.png",
    item: "./img/helmet.png",
  },
  {
    name: "superCat",
    speed: 0.5,
    hp: 1,
    png: "./img/supercat.png",
  },
  {
    name: "motoCat",
    speed: 0.5,
    hp: 2,
    png: "./img/motocat.png",
    item: "./img/moto.png",
  },
  {
    name: "flagCat",
    speed: 0.2,
    hp: 2,
    type: "flag",
    png: "./img/flagcat.png",
    item: "./img/flag.png",
  },
];
