const resetBtn = document.getElementById("erase-btn");
const sketchPad = document.getElementById("grid-container");
const gridSizeEl = document.getElementById("grid-size");
const changeSizeBtn = document.getElementById("change-size-btn");
const grayScaleRadio = document.getElementById("black-white");
const colorSchemeRadio = document.getElementById("color-scheme");
const rainbowRadio = document.getElementById("rainbow");
const traceColorPicker = document.getElementById("trace-color");
const bkgColorPicker = document.getElementById("background-color");

const GRID_CONTAINER_SIZE = 640;

//App state is an object that keeps trac of various variable pertaining to different state the app can be
let appState = {
  gridSize: 32,
  colorScheme: "grayscale", //can be: grayscale, user-colors, rainbow
  traceColor: "black",
  bkgColor: "white",
  mouseDown: false,
};

//initOrReset()  --erases the sketchpad
//               --used first time when the app is loaded
function initOrReset(gridSize) {
  sketchPad.innerHTML = "";
  constructGrid(appState.gridSize);
  appState.mouseDown = false;
  appState.colorScheme = "grayscale";
  appState.traceColor = "black";
  appState.bkgColor = "white";
}

resetBtn.addEventListener("click", initOrReset);

//constructGrid(gridSize)  --construct a grid of divs in the grid container div, using grifSize for the number of divs on one side
function constructGrid(gridSize) {
  let cellSize = Math.floor(GRID_CONTAINER_SIZE / gridSize);

  for (let i = 0; i < gridSize ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.style.backgroundColor = appState.bkgColor;
    cell.setAttribute("blackness", "0.4");
    cell.addEventListener("mouseover", (e) => applyCellColor(e));
    sketchPad.appendChild(cell);
  }
}

//applyCellColor(e)   --aplies a color to a cell
//                    --checks tha appstate color property and acts accordingly
function applyCellColor(e) {
  if (appState.mouseDown) {
    if (appState.colorScheme === "grayscale") {
      let blackness = parseFloat(e.target.getAttribute("blackness"));
      if (blackness < 1.0) {
        blackness += 0.2;
        e.target.setAttribute("blackness", blackness.toString());
      }
      console.log(blackness);
      e.target.style.backgroundColor = `rgba(0,0,0,${blackness})`;
    }
  }
}

sketchPad.addEventListener("mousedown", (e) => {
  e.preventDefault(); //disable drag and drop
  appState.mouseDown = true;
});
sketchPad.addEventListener("mouseup", () => {
  appState.mouseDown = false;
});

changeSizeBtn.addEventListener("click", () => {
  appState.gridSize = parseInt(gridSizeEl.value);
  console.log(appState.gridSize);
  initOrReset();
});

//testing area

initOrReset();
