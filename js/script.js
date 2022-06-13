const iconContainer = document.querySelector('.icons');

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

let theme = 'images';

const number = [
  `<div class="icon numbers"><p>0</p></div>`,
  `<div class="icon numbers"><p>1</p></div>`,
  `<div class="icon numbers"><p>2</p></div>`,
  `<div class="icon numbers"><p>4</p></div>`,
  `<div class="icon numbers"><p>5</p></div>`,
  `<div class="icon numbers"><p>6</p></div>`,
  `<div class="icon numbers"><p>7</p></div>`,
  `<div class="icon numbers"><p>8</p></div>`,
  `<div class="icon numbers"><p>9</p></div>`,
  `<div class="icon numbers"><p>10</p></div>`,
  `<div class="icon numbers"><p>11</p></div>`,
  `<div class="icon numbers"><p>12</p></div>`,
  `<div class="icon numbers"><p>13</p></div>`,
  `<div class="icon numbers"><p>14</p></div>`,
  `<div class="icon numbers"><p>15</p></div>`,
  `<div class="icon numbers"><p>16</p></div>`,
  `<div class="icon numbers"><p>17</p></div>`,
  `<div class="icon numbers"><p>16</p></div>`,
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

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * Math.floor(max)) + 8;
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

console.log(getRandomNumber(18) - 8);

const imagepairs =
  theme === 'images'
    ? generateImagesRandom(duplicateImages(images.slice(0, 8)))
    : generateImagesRandom(duplicateImages(number));

//append all images to image container
for (pairs of imagepairs) {
  iconContainer.innerHTML += pairs;
}

setTimeout(() => {
  document.querySelectorAll('.icon').forEach((item) => {
    item.classList.add('cover');
    item.firstChild.classList.add('cover_text');
  });
}, 2000);

//add event listeners to all images
let clickedImage = [];
let isMatchedCards;
let isNotMatchedCards;
document.querySelectorAll('.icon').forEach((item) => {
  item.addEventListener('click', () => {
    //reset the arr holding last selected images

    if (clickedImage.length == 1) {
      clearTimeout(isMatchedCards);
      clearTimeout(isNotMatchedCards);
    }
    if (clickedImage.length === 2) {
      clickedImage = [];
    }
    //display card image when the card is selected
    item.classList.remove('cover');
    item.classList.add('selected');
    item.classList.add('disabledbtntemp');
    item.firstChild.classList.add('disabledbutton_text');
    clickedImage.push(item.firstChild.classList.value);
    console.log(clickedImage);

    //logic after two cards are selected
    if (clickedImage.length === 2) {
      //if the images on selected cards match
      isMatchedCards = setTimeout(cardMatched, 700, clickedImage);

      //if the images on the cards do not match
      isNotMatchedCards = setTimeout(
        cardNotMatched,
        700,
        clickedImage
      );
    }
  });
});

console.log(iconContainer);

function cardMatched(clickedImage) {
  if (clickedImage[0] === clickedImage[1]) {
    document.querySelectorAll('.icon').forEach((item) => {
      if (
        item.firstChild.classList.value === clickedImage[0] ||
        item.firstChild.classList.value === clickedImage[1]
      ) {
        item.classList.add('disabledbutton');
        item.classList.remove('selected');
        item.firstChild.classList.add('disabledbutton_text');
      }
    });
  }
}

function cardNotMatched(clickedImage) {
  if (clickedImage[0] !== clickedImage[1]) {
    document.querySelectorAll('.icon').forEach((item) => {
      item.classList.add('cover');
      item.classList.remove('selected');
      item.classList.remove('disabledbtntemp');
      item.firstChild.classList.remove('disabledbutton_text');
    });
  }
}
