const domBox = document.querySelectorAll(".box");
const domP1 = document.querySelector("#p1");
const domP2 = document.querySelector("#p2");
const domReset = document.querySelector(".btn-reset");
const domBoard = document.querySelector(".papan");

let content = "x";
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

window.onload = () => {
  domBox.forEach((box, index) => {
    row.push(box);
  });

  row.forEach((box, index) => {
    box.addEventListener("click", (e) => {
      console.clear();
      input(e);
    });
  });
  reset();
};

function input(e) {
  let statusWin = [];
  if (e.currentTarget.innerHTML === "") {
    setPlayer();
    e.currentTarget.innerHTML = content;
    statusWin = cekWin(content);
    console.log(statusWin);
    if (statusWin) {
      alert(content.toUpperCase() + " Menang");
      setWin[statusWin].forEach((i) => {
        console.log(i);
        row[i].classList.add(styleWin);
        domBoard.classList.add(styleBlock);
      });
    }
    content = content === "x" ? "o" : "x";
  }
}

function cekWin(currentTxt) {
  let win;
  setWin.forEach((arr) => {});
  for (let a = 0; a < setWin.length; a++) {
    console.log(setWin[a]);
    console.log("===========");
    for (let b = 0; b < setWin[a].length; b++) {
      let txt = row[setWin[a][b]].innerHTML;
      if (txt == "" || txt != currentTxt) {
        win = false;
        break;
      } else {
        win = true;
      }
      // console.log(
      //   setWin[a][b] +
      //     ",dom:" +
      //     row[setWin[a][b]].innerHTML +
      //     ", current" +
      //     currentTxt +
      //     ", status:" +
      //     win
      // );
    }
    if (win === true) {
      return a;
      // statusWin.push({
      //   status: win,
      //   index: a,
      // });
      // break;
    }
  }
  console.log(currentTxt + ", status: " + win);
}

function reset() {
  domReset.addEventListener("click", () => {
    row.forEach((box) => {
      box.textContent = "";
    });
    console.clear();
    content = "x";
    for (let i = 0; i < row.length; i++) {
      row[i].classList.remove(styleWin);
      domBoard.classList.remove(styleBlock);
    }
  });
}

function demoAI() {
  let a = Math.floor(Math.random() * (3 - 0));
  let b = Math.floor(Math.random() * (6 - 3)) + 3;
  let c = Math.floor(Math.random() * (8 - 6)) + 6;
  console.log(a + "," + b + "," + c);
}

function setPlayer() {
  domP1.textContent = "";
  domP2.textContent = "";
  content === "x" ? (domP2.textContent = "play") : (domP1.textContent = "play");
}
