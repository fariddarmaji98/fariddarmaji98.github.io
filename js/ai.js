function inputAi(e) {
  statusWin = [];
  if (e.currentTarget.innerHTML === "") {
    console.clear();
    domLable2.style.display = "none";
    domLoading.style.display = "block";
    e.currentTarget.innerHTML = content;
    setTimeout(() => {
      domLable2.style.display = "block";
      domLoading.style.display = "none";
      statusWin = cekWin(content);
      if (statusWin || statusWin === 0) {
        alert(content.toUpperCase() + " Menang");
        setWin[statusWin].forEach((i) => {
          row[i].classList.add(styleWin);
          domBoard.classList.add(styleBlock);
        });
        return true;
      } else {
        getPly();
      }
    }, 500);
  }
}

function getPly() {
  let move, comboAi, comboPlayer;
  let selectAi = []; // nampung score combo ai
  let selectPlayer = []; // nampung score combo player
  setWin.forEach((arr) => selectAi.push(getScore("o", arr)));
  setWin.forEach((arr) => selectPlayer.push(getScore("x", arr)));
  comboPlayer = getBestCombo(selectPlayer, "x");
  comboAi = getBestCombo(selectAi, "o");

  console.log("combo ai - O - : -v");
  console.log(selectAi);
  console.log(comboAi);
  console.log("===============");
  console.log("combo player - X - : -v");
  console.log(selectPlayer);
  console.log(comboPlayer);
  if (selectAi.includes(1) === false && selectAi.includes(2) === false) {
    console.log("Combo AI Undefined");
    randomMove("o");
  } else {
    if (selectAi.includes(2)) {
      console.log("next ai nya menang");
      if (comboAi === undefined) {
        randomMove("o");
      } else {
        move = getComboMove(comboAi);
        row[move[getRandom(move.length)]].innerHTML = "o";
      }
      console.log(move);
      console.log(cekWin("o"));
      statusWin = cekWin("o");
      if (statusWin || statusWin === 0) {
        alert("O Menang");
        setWin[statusWin].forEach((i) => {
          row[i].classList.add(styleWin);
          domBoard.classList.add(styleBlock);
        });
        return true;
      }
    } else {
      if (selectPlayer.includes(2)) {
        console.log("next player nya menang");
        move = getComboMove(comboPlayer);
        console.log(move);
        if (move) {
          row[move[getRandom(move.length)]].innerHTML = "o";
        } else {
          return;
        }
      } else {
        console.log("lanjut");
        move = getComboMove(comboAi);
        row[move[getRandom(move.length)]].innerHTML = "o";
        console.log(move);
        // console.log(cekWin("o"));
      }
    }
  }
  // content = content === "x" ? "o" : "x";
  content = "x";
}

function getComboMove(arr) {
  let tmpMove = [];
  arr.forEach((el) => {
    if (row[el].innerHTML === "") tmpMove.push(el);
  });
  return tmpMove;
}

function randomMove(txt) {
  let rowReady = row.filter((el) => el.innerHTML === "");
  rowReady.length > 0
    ? (rowReady[getRandom(rowReady.length)].innerHTML = txt)
    : alert("Seri . . .");
}

function getBestCombo(tmpSelect, txt) {
  let comboMove;
  let maxScore = Math.max(...tmpSelect); // nampung data score combo tertinggi
  tmp = []; // nampung combo terbaik
  // console.log(tmpSelect);
  for (let i = 0; i < tmpSelect.length; i++) {
    // if (cekComboReady(setWin[i])) {
    if (cekComboReady(setWin[i], txt)) {
      if (tmpSelect[i] === maxScore && tmpSelect[i] !== 0) {
        // console.log("pertama kondisi true");
        // console.log(setWin[i]);
        // console.log(getScore("x", setWin[i]));
        console.log(comboMove + ", " + getScore(txt, setWin[i]));
        if (comboMove === undefined) {
          tmp = [];
          comboMove = getScore(txt, setWin[i]);
        }
        tmp.push(setWin[i]);
      } else {
        if (tmpSelect[i] < maxScore && tmpSelect[i] !== 0) {
          // console.log("maxScore:" + maxScore + ", score:" + tmpSelect[i]);
          // console.log(txt + "kedua kondisi false " + tmp.length);
          // console.log(setWin[i]);
          console.log(comboMove + ", " + getScore(txt, setWin[i]));
          if (comboMove === undefined) {
            tmp.push(setWin[i]);
          }
        }
      }
    }
  }
  comboMove = tmp[getRandom(tmp.length)];
  return comboMove;
}

function cekComboReady(arr, txt) {
  let ready = false;
  let valCombo = [];
  let nextContent = txt === "x" ? "o" : "x";
  arr.forEach((el) => {
    valCombo.push(row[el].innerHTML);
  });
  if (
    valCombo.includes("") &&
    valCombo.includes(txt) &&
    !valCombo.includes(nextContent)
  ) {
    // console.log(valCombo);
    // console.log(content);
    ready = true;
  }
  return ready;
}

function getRandom(limit) {
  return Math.floor(Math.random() * limit);
}

function getScore(txt, arr) {
  let score = 0;
  let tmpScore = []; // nampung nilai combo
  for (let i = 0; i < arr.length; i++) {
    tmpScore.push(row[arr[i]].innerHTML);
  }
  for (let a = 0; a < tmpScore.length; a++) {
    // console.log(tmp[a]);
    if (tmpScore[a] === txt) {
      score++;
      // console.log(score);
    }
  }
  // tmpSelect.push([index, score]);
  // console.log(tmp);
  // return [index, score];
  return score;
}
