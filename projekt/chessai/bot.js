function getPieces() {
  let pieces = [];

  for (i in game.SQUARES) {
    try {
      pieces.push(
        game.get(game.SQUARES[i]).color + game.get(game.SQUARES[i]).type
      );
    } catch (err) {}
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
  let points = { w: 0, b: 0 };

  let pieces = getPieces();
  for (i in pieces) {
    if (pieces[i].charAt(1) !== "k") {
      let color = pieces[i].charAt(0);
      let c = pieces[i].charAt(1);
      points[color] += pointValue[c];
    }
  }
  let evalution = points["w"] - points["b"];

  return evalution;
}

function findBestMove(depth) {
  let bestEvalution = -Infinity;
  let bestMove = null;
  let moves = game.moves();

  for (var i = 0; i < moves.length; i++) {
    let move = moves[i];
    game.move(move);
    value = -minimax(depth - 1);
    game.undo();
    if (value >= bestMove) {
      bestEvalution = value;
      bestMove = move;
    }
  }
  return bestMove;
}

function minimax(depth) {
  if (depth == 0) {
    return evaluate();
  }
  let bestMove = -Infinity;
  let moves = game.moves();

  for (var i = 0; i < moves.length; i++) {
    game.move(moves[i]);
    bestMove = Math.max(bestMove, minimax(depth - 1));
    game.undo();
  }
  return bestMove;
}
