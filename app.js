const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const removeBtn = document.getElementById("jsRemove");

// 기본 붓 컬러값 저장.
const INITIAL_COLOR = "#2c2c2c";
// 캔버스 사이즈 지정.
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// 기본 painting 변수를 false로 저장해둬야함.
let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

// 마우스를 움직일 시 마우스 x , y 값을 알아냄.
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    // beginPath = 하위 경로 목록을 비워 새 경로를 시작하는 메소드.
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // lineTo = 하위 경로의 마지막 지점을 지정된 좌표에 연결하여 하위경로에 직선을 추가하는 메소드.
    // x와 y의 라인을 연결.
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// 컬러 클릭 함수
// 사용자가 선택한 색을 가져와 선과 배경색을 변경.
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// 붓 사이즈 조절 함수
// 사용자가 선택한 붓의 사이즈를 가져와 붓 사이즈 변경.
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

// fill 버튼 클릭시 실행되는 함수
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

// 캔버스를 클릭하면 실행되는 함수
// fillRect = x와 y의 시작점에서 색을 채우는 속성.
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

// 캔버스 이미지 저장 함수.
// 캔버스의 url을 가져와 a링크를 생성해주고 img href 변경.
// download로 저장할 때 이미지 이름 지정.
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// 지우기
function handleRemoveClick() {
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// colors에 있는 색깔 배열을 가져오는 작업.
Array.from(colors).forEach((color) => color.addEventListener("click", handleColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
if (removeBtn) {
  removeBtn.addEventListener("click", handleRemoveClick);
}
