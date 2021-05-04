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

function evaluate() {
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
  evalution = points["w"] - points["b"];

  return evalution;
}

function initSearch(depth) {
  possibleEvals = [];
  search(depth);
  return Math.max(...possibleEvals);
}

function search(depth) {
  moves = game.moves();
  bestEvalution = -Infinity;

  if (depth == 0) {
    // console.log(evaluate());
    return evaluate();
  }
  if (moves === 0) return;
  moves.forEach((move) => {
    game.move(move);
    evalution = -search(depth - 1);
    possibleEvals.push(evalution);
    game.undo(); //move as arg
  });

  return evalution;
}
