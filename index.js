const container = document.querySelector('.container');
const totalItems = 16;

for (let i = 0; i < totalItems; i++) {
  const gridItem = document.createElement('div');
  gridItem.setAttribute('class', 'grid-item');
  gridItem.textContent = i + 1;

  container.appendChild(gridItem);
}