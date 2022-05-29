const domBox = document.querySelectorAll(".box");
// const domP1 = document.querySelector("#p1");
const domP2 = document.querySelector("#p2");
const domReset = document.querySelector(".btn-reset");
const domBoard = document.querySelector(".papan");
const domPlyMode = document.querySelector(".player-mode");
const domAiMode = document.querySelector(".ai-mode");
const domLoading = document.querySelector(".loading");
const domLable2 = document.querySelector(".lable-player");
const domTitleMode = document.querySelector(".title-lable");

let tmp = []; // ai
let aiCry = false; // ai
let content = "x";
let mode = "";
let statusWin = [];
let titleMode = "";
const styleWin = "box-win";
const styleBlock = "block-click";
const row = [];
const setWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

domPlyMode.addEventListener("click", () => {
  reset();
  domPlyMode.classList.add("mode-select");
  domAiMode.classList.remove("mode-select");
  mode = "player";
  titleMode = "Multi Player Mode";
  setPlayer();
  main();
});
domAiMode.addEventListener("click", () => {
  reset();
  domAiMode.classList.add("mode-select");
  domPlyMode.classList.remove("mode-select");
  domLable2.innerHTML = "AI / Computer";
  mode = "ai";
  titleMode = "AI Mode";
  setPlayer();
  main();
});

domReset.addEventListener("click", () => {
  reset();
});

function main() {
  domBox.forEach((box) => {
    row.push(box);
  });

  row.forEach((box) => {
    box.addEventListener("click", (e) => {
      mode === "player" ? inputPlayer(e) : inputAi(e);
    });
  });
}

function reset() {
  row.forEach((box) => {
    box.textContent = "";
  });
  for (let i = 0; i < row.length; i++) {
    row[i].classList.remove(styleWin);
    domBoard.classList.remove(styleBlock);
  }
  setPlayer();
  content = "x";
  tmp = [];
  statusWin = [];
  aiCry = false;
  // domLable2.innerHTML = "";
  setPlayer();
  console.clear();
  console.log("reset");
  console.log(titleMode);
}

function setPlayer() {
  // console.log("content:" + content);
  let labelP1 = "Player 1 play";
  let labelP2 = "";
  mode === "player" ? (labelP2 = "Player 2 play") : (labelP2 = "AI / Computer");
  content === "x"
    ? (domLable2.innerHTML = labelP1)
    : (domLable2.innerHTML = labelP2);
  domTitleMode.innerHTML = titleMode;
}
