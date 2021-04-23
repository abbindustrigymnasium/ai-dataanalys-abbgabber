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

function search(depth) {
  moves = game.moves();
  bestEvalution = -Infinity;
  possibleEvals = [];

  if (depth == 0) {
    // console.log(evaluate());
    return evaluate();
  }
  if (moves === 0) return;

  // console.log(moves);
  moves.forEach((move) => {
    // console.log(game.move(moves[move]));
    game.move(move);
    evalution = -search(depth - 1);
    console.log("Evalution: " + evalution);
    // console.log("Best Evalution: " + this.bestEvalution);
    bestEvalution = Math.max(evalution, bestEvalution);
    game.undo(); //move as arg
  });
  // bestEvalution = Math.max(possibleEvals);
  // console.log(possibleEvals);
  // console.log(bestEvalution);
  return bestEvalution;
}
