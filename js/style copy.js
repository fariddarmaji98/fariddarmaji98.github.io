const domBox = document.querySelectorAll(".box");
// let playerX = true;
const domP1 = document.querySelector("#p1");
const domP2 = document.querySelector("#p2");
const domReset = document.querySelector(".btn-reset");

const row = [];
let content = "x";
const size = 3;
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
  main();
  reset();
  // console.log(setLimitRow());
  // console.log(setLimitColumn());
};

function setLimitRow() {
  let limit = [];
  for (let i = 0; i < size; i++) {
    if (limit.length) {
      //   console.log(border.length);
      limit.push(limit[i - 1] + size);
    } else {
      limit.push(size - 1);
    }
    // console.log(border);
  }
  return limit;
}

function setLimitColumn() {
  let limit = [];
  for (let i = row.length - size; i < row.length; i++) {
    limit.push(i);
  }
  return limit;
}

function cekRow(currentTxt) {
  const limitRow = setLimitRow();
  let cek = [];
  let output = false;
  console.log(limitRow);
  console.log(currentTxt);
  limitRow.forEach((val, index) => {
    console.log(val + "------");
    if (index === 0) {
      for (let i = 0; i <= val; i++) {
        // console.log(i);`x
        // cek[index] = currentTxt;
        // if (currentTxt === row[i].textContent) {
        console.log(i + ", " + currentTxt + ", " + row[i].textContent);
        cek.push(currentTxt);
        // output = true;
        // }
      }
    } else {
      for (let i = limitRow[index - 1] + 1; i <= val; i++) {
        // cek[index] = currentTxt;
        // if (currentTxt === row[i].textContent) {
        // output = true;
        // console.log(i + ", " + currentTxt + ", " + row[i].textContent);
        console.log(i + ", " + currentTxt);
        cek.push(currentTxt);
        // }
      }
    }
    console.log(cek);
  });
  return output;
  cek = [];
}

function reset() {
  domReset.addEventListener("click", () => {
    row.forEach((box) => {
      box.textContent = "";
    });
    console.clear();
  });
}

function main() {
  domBox.forEach((box, index) => {
    row.push(box);
  });

  row.forEach((box) => {
    box.addEventListener("click", (e) => {
      console.log(e.currentTarget.innerHTML);
      if (e.currentTarget.innerHTML === "") {
        e.currentTarget.innerHTML = content;
        setPlayer();
        console.log(cekRow(content));
        content = content === "x" ? "o" : "x";
      }
      //   borderRow();
    });
  });
}

const setPlayer = () => {
  domP1.textContent = "";
  domP2.textContent = "";
  content === "x" ? (domP2.textContent = "play") : (domP1.textContent = "play");
};
