function inputPlayer(e) {
  statusWin = [];
  if (e.currentTarget.innerHTML === "") {
    setPlayer();
    e.currentTarget.innerHTML = content;
    statusWin = cekWin(content);
    console.log(statusWin);
    if (statusWin || statusWin === 0) {
      alert(content.toUpperCase() + " Menang");
      setWin[statusWin].forEach((i) => {
        console.log(i);
        row[i].classList.add(styleWin);
        domBoard.classList.add(styleBlock);
      });
      return true;
    }
    content = content === "x" ? "o" : "x";
    setPlayer();
  }
}

function cekWin(currentTxt) {
  let win;
  setWin.forEach((arr) => {});
  for (let a = 0; a < setWin.length; a++) {
    // console.log(setWin[a]);
    // console.log("===========");
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
      console.log(a);
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
