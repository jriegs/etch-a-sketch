/*
  FUNCTIONS
*/

function getGridValues() {
  // get width and height input values
  const widthInput = document.querySelector('.js-width');
  const heightInput = document.querySelector('.js-height');

  let widthValue = widthInput.value || 100;
  let heightValue = heightInput.value || 100;

  // check input values to be safe (html entities?)
  if (widthValue > 100 && heightValue > 100) {
    widthValue = 100;
    heightValue = 100;
  } else if(widthValue < 50 && heightValue < 50) {
    widthValue = 50;
    heightValue = 50;
  }

  // if a number between 10 and 100 set width/height correspondingly
  const gridPixels = widthValue * heightValue;

  // return object of values
  return {
    width: widthValue,
    height: heightValue,
    totalArea: gridPixels
  };
}

function generateGrid(totalArea) {
  // create grid items and add to container
  for (let i = 0; i < totalArea; i++) {
    const gridItem = document.createElement('div');
    gridItem.setAttribute('class', 'grid-item');

    grid.appendChild(gridItem);
  }
}

function regenerateGrid(grid, gridArea) {
  // remove pixels from grid
  while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
  }

  // re-create grid
  generateGrid(gridArea);
}

// let user set grid dimensions through form submission
function setGridDimensions(e) {
  e.preventDefault();

  // get grid values
  const dimensions = getGridValues();

  // set css grid styles 
  const grid = document.querySelector('.grid');
  grid.style.gridTemplateColumns = `repeat(${dimensions.width}, 1fr)`;

  // set global width and height variables to calculate total grid items (that compose sketch pad)
  regenerateGrid(grid, dimensions.totalArea);
}

// change background color of hover target
function sketch(e) {
  const hoverItem = e.target;
  hoverItem.classList.toggle('bg-hover');
}

// clear sketch grid
function clearSketch() {
  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach(item => {
    if (item.classList.contains('bg-hover')) {
      item.classList.remove('bg-hover');
    }
  });
}


/*
  GLOBAL
*/

let totalPixels = getGridValues().totalArea;
const grid = document.querySelector('.js-grid');
const resetBtn = document.querySelector('.js-reset');
const form = document.querySelector('.js-dimensions-form');

// generate sketch grid
generateGrid(totalPixels);

// when mouse hovers over grid item, set background
grid.addEventListener('mouseover', sketch);

// when user submits form set grid dimensions
form.addEventListener('submit', setGridDimensions);

// clear sketch
resetBtn.addEventListener('click', clearSketch);