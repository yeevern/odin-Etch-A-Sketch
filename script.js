const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#4d4949'
const DEFAULT_MODE = 'color'

let currentSize = DEFAULT_SIZE
let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE

const colorPicker = document.getElementById('colorPicker')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')
const grid = document.getElementById('grid')

function createGrid(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`  // repeat size time of 1fr
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mousedown', changeColor);
        // gridElement.addEventListener('mouseover', changeColor);
        grid.appendChild(gridElement)
      }
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    currentMode = newMode;
}

function changeColor(e) {
    // if (e.type === 'mouseover' && !'mousedown') return
    if (currentMode === 'rainbow') {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#f5f5f5'
    }
}

function clearGrid() {
    grid.innerHTML = ''
}

function reloadGrid() {
    clearGrid();
    createGrid(currentSize)
}

function changeSize(newSize) {
    setCurrentSize(newSize);
    updateSizeValue(newSize);
    reloadGrid();
}   

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

window.onload = () => {
    createGrid(DEFAULT_SIZE);
}
