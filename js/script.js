const socket = io('ws://localhost:8080');

const optionMenu = document.querySelector('.game_start');
const gameBoard = document.querySelector('.game_board');
const iconContainer = document.querySelector('.icons');
const btnIcons = document.getElementById('btn_icons');
const btnNumbers = document.getElementById('btn_numbers');
const btn1 = document.getElementById('btn_1');
const btn2 = document.getElementById('btn_2');
const btn3 = document.getElementById('btn_3');
const btn4 = document.getElementById('btn_4');
const btn4x4 = document.getElementById('btn_4x4');
const btn6x6 = document.getElementById('btn_6x6');
const btnStartGame = document.getElementById('btn_start_game');
const restartGame = document.getElementById('restart');
const btnGameEndsRestart = document.getElementById('game_end_restart');
const btnGameEndsNewGame = document.getElementById('game_end_new_game');
let theme = 'images';
let players = 1;
let grid = '4x4';

btnIcons.addEventListener('click', () => {
  theme = 'icons';
  document.querySelectorAll('.btn_theme').forEach((item) => {
    if (item.classList.contains('game_start-active')) {
      item.classList.remove('game_start-active');
    }
  });
  btnIcons.classList.add('game_start-active');
});

btnNumbers.addEventListener('click', () => {
  theme = 'numbers';
  document.querySelectorAll('.btn_theme').forEach((item) => {
    if (item.classList.contains('game_start-active')) {
      item.classList.remove('game_start-active');
    }
  });
  btnNumbers.classList.add('game_start-active');
});

btn1.addEventListener('click', () => {
  players = 1;
  console.log(players);
});

btn4x4.addEventListener('click', () => {
  grid = '4x4';
  document.querySelectorAll('.btn_grid').forEach((item) => {
    if (item.classList.contains('game_start-active')) {
      item.classList.remove('game_start-active');
    }
  });
  btn4x4.classList.add('game_start-active');
});

btn6x6.addEventListener('click', () => {
  grid = '6x6';
  document.querySelectorAll('.btn_grid').forEach((item) => {
    if (item.classList.contains('game_start-active')) {
      item.classList.remove('game_start-active');
    }
  });
  btn6x6.classList.add('game_start-active');
});

const images = [
  `<div class="icon"><i class="fas fa-cat"></i></div>`,
  `<div class="icon"><i class="fas fa-crow"></i></div>`,
  `<div class="icon"><i class="fas fa-dog"></i></div>`,
  `<div class="icon"><i class="fas fa-dove"></i></div>`,
  `<div class="icon"><i class="fas fa-spider"></i></div>`,
  `<div class="icon"><i class="fas fa-chess-knight"></i></div>`,
  `<div class="icon"><i class="fab fa-apple"></i></div>`,
  `<div class="icon"><i class="fab fa-amazon"></i></div>`,
  `<div class="icon"><i class="fas fa-camera-retro"></i></div>`,
  `<div class="icon"><i class="fab fa-cc-visa"></i></div>`,
  `<div class="icon"><i class="fab fa-firefox"></i></div>`,
  `<div class="icon"><i class="fas fa-futbol"></i></div>`,
  `<div class="icon"><i class="fas fa-yin-yang"></i></div>`,
  `<div class="icon"><i class="fab fa-internet-explorer"></i></div>`,
  `<div class="icon"><i class="fab fa-js-square"></i></div>`,
  `<div class="icon"><i class="fas fa-laptop-code"></i></div>`,
  `<div class="icon"><i class="fab fa-spotify"></i></div>`,
  `<div class="icon"><i class="fas fa-tint"></i></div>`,
];

const numbers = [
  `<div class="icon numbers"><p class="num-0">0</p></div>`,
  `<div class="icon numbers"><p class="num-1">1</p></div>`,
  `<div class="icon numbers"><p class="num-2">2</p></div>`,
  `<div class="icon numbers"><p class="num-3">3</p></div>`,
  `<div class="icon numbers"><p class="num-4">4</p></div>`,
  `<div class="icon numbers"><p class="num-5">5</p></div>`,
  `<div class="icon numbers"><p class="num-6">6</p></div>`,
  `<div class="icon numbers"><p class="num-7">7</p></div>`,
  `<div class="icon numbers"><p class="num-8">8</p></div>`,
  `<div class="icon numbers"><p class="num-9">9</p></div>`,
  `<div class="icon numbers"><p class="num-10">10</p></div>`,
  `<div class="icon numbers"><p class="num-11">11</p></div>`,
  `<div class="icon numbers"><p class="num-12">12</p></div>`,
  `<div class="icon numbers"><p class="num-13">13</p></div>`,
  `<div class="icon numbers"><p class="num-14">14</p></div>`,
  `<div class="icon numbers"><p class="num-15">15</p></div>`,
  `<div class="icon numbers"><p class="num-16">16</p></div>`,
  `<div class="icon numbers"><p class="num-18">18</p></div>`,
];
//create a pair from each image
const duplicateImages = (arr) => {
  const image_clone = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    image_clone.push(arr[i]);
  }
  return image_clone;
};

//generate a random number from 0 to maximum number of images
const getRandomImage = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
};

//reshuffle the image pairs
const generateImagesRandom = (arr) => {
  const random = [];
  let num = arr.length;
  while (num !== 0) {
    let random_image = getRandomImage(num);
    random.push(arr[random_image]);
    arr.splice(random_image, 1);
    num--;
  }
  return random;
};

btnStartGame.addEventListener('click', () => {
  optionMenu.classList.add('hidden');
  gameBoard.classList.remove('hidden');
  const gridSize = getRandomNumber(8, 18);

  let imagepairs;
  loadGame(gridSize, imagepairs);
});

btnGameEndsRestart.addEventListener('click', () => {
  clearContainer(iconContainer);
  timeElapsed = '';
  movesCount = 0;
  pairedIcons = 0;
  min = 0;
  sec = 0;
  document.getElementById('moves').innerText = '';
  document.getElementById('time').innerText = '';
  document.querySelector('.game_end').classList.add('hidden');
  optionMenu.classList.add('hidden');
  gameBoard.classList.remove('hidden');
  const gridSize = getRandomNumber(8, 18);

  let imagepairs;
  loadGame(gridSize, imagepairs);
});

btnGameEndsNewGame.addEventListener('click', () => {
  clearContainer(iconContainer);
  timeElapsed = '';
  movesCount = 0;
  pairedIcons = 0;
  min = 0;
  sec = 0;
  document.getElementById('moves').innerText = '';
  document.getElementById('time').innerText = '';
  document.querySelector('.game_end').classList.add('hidden');
  optionMenu.classList.remove('hidden');
  gameBoard.classList.add('hidden');
});

//add event listeners to all images
let clickedImage = [];
let isMatchedCards;
let isNotMatchedCards;
let movesCount = 0;
let pairedIcons = 0;
let isGameOver;
let gameOver = false;
let hasGameBegan = false;
let timeElapsed = '';

restartGame.addEventListener('click', () => {
  alert('!!!!!!!!!!');
});

function loadGame(gridSize, imagepairs) {
  if (grid === '4x4') {
    imagepairs =
      theme === 'icons'
        ? generateImagesRandom(
            duplicateImages(images.slice(gridSize - 8, gridSize))
          )
        : generateImagesRandom(
            duplicateImages(numbers.slice(gridSize - 8, gridSize))
          );
  } else {
    imagepairs =
      theme === 'icons'
        ? generateImagesRandom(duplicateImages(images))
        : generateImagesRandom(duplicateImages(numbers));
  }

  //append all images to image container
  for (pairs of imagepairs) {
    iconContainer.innerHTML += pairs;
  }

  if (grid === '4x4') {
    document.querySelectorAll('.icon').forEach((item) => {
      item.style.width = '55px';
      item.style.height = '55px';
      item.style.fontsize = '1.6rem';
    });
  }
  iconContainer.classList.add('disabledbtntemp'); //disable gameboard before start
  setTimeout(showCardsTemp, 2000);

  gameControl(imagepairs);
}

function showCardsTemp() {
  document.querySelectorAll('.icon').forEach((item) => {
    item.classList.add('cover');
    item.firstChild.classList.add('cover_text');
  });
  iconContainer.classList.remove('disabledbtntemp'); //enable gameboard after the start
  isGameOver = setInterval(timer, 1000);
}

//handle click on each card
function gameControl(imagepairs) {
  document.querySelectorAll('.icon').forEach((item) => {
    item.addEventListener('click', () => {
      //reset the arr holding last selected images
      if (clickedImage.length == 1) {
        clearTimeout(isMatchedCards);
        clearTimeout(isNotMatchedCards);
      }

      movesCount++;
      document.getElementById('moves').innerText = movesCount;

      //display card image when the card is selected
      item.classList.remove('cover');
      item.classList.add('selected');
      item.classList.add('disabledbtntemp');
      item.firstChild.classList.add('disabledbutton_text');

      if (clickedImage.length <= 2) {
        clickedImage.push(item.firstChild.classList.value);
      }

      //logic after two cards are selected
      if (clickedImage.length === 2) {
        iconContainer.classList.add('disabledbtntemp');
        //if the images on selected cards match
        isMatchedCards = setTimeout(cardMatched, 500, clickedImage, imagepairs);

        //if the images on the cards do not match
        isNotMatchedCards = setTimeout(cardNotMatched, 500, clickedImage);

        if ((isMatchedCards, isNotMatchedCards)) {
          clickedImage = [];
        }
      }
    });
  });
}

function cardMatched(clickedImage, imagepairs) {
  if (clickedImage[0] === clickedImage[1]) {
    document.querySelectorAll('.icon').forEach((item) => {
      if (
        item.firstChild.classList.value === clickedImage[0] ||
        item.firstChild.classList.value === clickedImage[1]
      ) {
        item.classList.add('disabledbutton');
        item.classList.remove('selected');
        item.firstChild.classList.add('disabledbutton_text');
        iconContainer.classList.remove('disabledbtntemp');
      }
    });
    pairedIcons += 2;
    console.log(pairedIcons);
  }

  if (pairedIcons === imagepairs.length) {
    gameOver = true;
    if (gameOver) clearInterval(isGameOver);
    document.getElementById('time-elapsed').innerText = timeElapsed;
    document.getElementById('moves-taken').innerText = movesCount;
    document.querySelector('.game_end').classList.remove('hidden');
    console.log('time elapsed ' + timeElapsed);
    console.log('moves taken ' + movesCount);
  }
}

function cardNotMatched(clickedImage) {
  if (clickedImage[0] !== clickedImage[1]) {
    document.querySelectorAll('.icon').forEach((item) => {
      if (
        item.firstChild.classList.value === clickedImage[0] ||
        item.firstChild.classList.value === clickedImage[1]
      ) {
        item.classList.add('cover');
        item.classList.remove('selected');
        item.classList.remove('disabledbtntemp');
        item.firstChild.classList.remove('disabledbutton_text');
        iconContainer.classList.remove('disabledbtntemp');
      }
    });
  }
}

function clearContainer(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
let min = 0;
let sec = 0;
function timer() {
  sec++;
  if (sec < 10) {
    timeElapsed = `${min}:0${sec}`;
    document.getElementById('time').innerText = timeElapsed;
  } else {
    timeElapsed = `${min}:${sec}`;
    document.getElementById('time').innerText = timeElapsed;
  }
  if (sec >= 59) {
    sec = -1; //because we want the next count to begin from zero
    min++;
  }
}
