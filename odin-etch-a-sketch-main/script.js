

// Get DOM items
const grid = document.querySelector(".canvas");
const slider = document.getElementById("slider");
const dims = document.getElementById("dimensions");


// Initialize the canvas
function createCanvas(size) {
  grid.innerHTML = ""
  grid.style.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;
  
  for(let i=0; i<size*size; i++){
    const gridDiv = document.createElement('div');
    //gridDiv.style.backgroundColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
    grid.appendChild(gridDiv).className = 'grid-item';
  }
}

// get grid size value from slider
let update = () => {
  dims.innerHTML = `${slider.value} X ${slider.value}`;
  createCanvas(slider.value);
  };
  
slider.addEventListener('input', update);
update();

window.onload = () => {
  createCanvas(slider.value);
}
