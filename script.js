const resetBtn = document.getElementById("erase-btn");
const sketchPad = document.getElementById("grid-container");
const gridSizeEl = document.getElementById("grid-size");

const changeSizeBtn = document.getElementById("change-size-btn");

const grayScaleRadio = document.getElementById("black-white");
const colorSchemeRadio = document.getElementById("color-scheme");
const rainbowRadio = document.getElementById("rainbow");

const colorPickersContainer = document.getElementById("color-pickers");
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
  appState.mouseDown = false;
  appState.colorScheme = "grayscale";
  grayScaleRadio.setAttribute("checked", "true");
  appState.traceColor = traceColorPicker.value;
  appState.bkgColor = bkgColorPicker.value;
  constructGrid(appState.gridSize);
}

resetBtn.addEventListener("click", () => constructGrid(appState.gridSize));

//constructGrid(gridSize)  --construct a grid of divs in the grid container div, using grifSize for the number of divs on one side
function constructGrid(gridSize) {
  let cellSize = Math.floor(GRID_CONTAINER_SIZE / gridSize);

  sketchPad.innerHTML = "";

  for (let i = 0; i < gridSize ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.style.backgroundColor = appState.bkgColor;
    cell.setAttribute("blackness", "0.4");
    cell.addEventListener("mouseover", (e) => applyCellColor(e));
    cell.addEventListener("mousedown", (e) => {
      e.preventDefault(); //disable drag-and-drop
      appState.mouseDown = true;
      applyCellColor(e);
    });
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
      e.target.style.backgroundColor = `rgba(0,0,0,${blackness})`;
    } else if (appState.colorScheme === "rainbow") {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      e.target.style.backgroundColor = `rgba(${r},${g},${b},1)`;
    } else if (appState.colorScheme === "user-colors") {
      e.target.style.backgroundColor = appState.traceColor;
    }
  }
}

//I added the mouseupEventListener to the whole grid container to avoid doing it for each individual cell
sketchPad.addEventListener("mouseup", () => {
  appState.mouseDown = false;
});

changeSizeBtn.addEventListener("click", () => {
  appState.gridSize = parseInt(gridSizeEl.value);
  constructGrid(appState.gridSize);
});

//hideColorPickers()  --hides the color pickers
function hideColorPickers() {
  colorPickersContainer.style.display = "none";
}

colorSchemeRadio.addEventListener("change", () => {
  colorPickersContainer.style.display = "flex";
  appState.bkgColor = bkgColorPicker.value;
  appState.traceColor = traceColorPicker.value;
  appState.colorScheme = "user-colors";
  constructGrid(appState.gridSize);
});

grayScaleRadio.addEventListener("change", () => {
  hideColorPickers();
  appState.colorScheme = "grayscale";
  appState.traceColor = "black";
  appState.bkgColor = "white";
  constructGrid(appState.gridSize);
});

rainbowRadio.addEventListener("change", () => {
  hideColorPickers();
  appState.colorScheme = "rainbow";
  appState.traceColor = "black";
  appState.bkgColor = "white";
  constructGrid(appState.gridSize);
});

traceColorPicker.addEventListener("change", (e) => {
  appState.traceColor = e.target.value;
});

bkgColorPicker.addEventListener("change", (e) => {
  appState.bkgColor = e.target.value;
  constructGrid(appState.gridSize);
});

//testing area

initOrReset();
