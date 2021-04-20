function getPieces() {
  pieces = [];

  for (i in game.SQUARES) {
    try {
      pieces.push(
        game.get(game.SQUARES[i]).color + game.get(game.SQUARES[i]).type
      );
    } catch (err) {
      //   console.log(err);
    }
  }
  return pieces;
}

function getScore() {
  pointValue = {
    p: 100,
    n: 300,
    b: 300,
    r: 500,
    q: 900,
  };
  points = { w: 0, b: 0 };

  pieces = getPieces();
  for (i in pieces) {
    if (pieces[i].charAt(1) !== "k") {
      color = pieces[i].charAt(0);
      c = pieces[i].charAt(1);
      points[color] += pointValue[c];
    }
  }
  console.log(points);
  return points;
}
