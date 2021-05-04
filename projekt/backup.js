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

function findBestMove(depth, maximizingPlayer) {
  let bestEvalution = -Infinity;
  let bestMove = null;
  let moves = game.moves();

  for (var i = 0; i < moves.length; i++) {
    let move = moves[i];
    game.move(move);
    value = minimax(depth - 1, !maximizingPlayer);
    game.undo();
    if (value >= bestMove) {
      bestEvalution = value;
      bestMove = move;
    }
  }
  return bestMove;
}

function minimax(depth, maximizingPlayer, alpha, beta) {
  if (depth == 0) {
    return evaluate();
  }
  let moves = game.moves();
  if (maximizingPlayer) {
    let bestMove = -Infinity;
    alpha: for (var i = 0; i < moves.length; i++) {
      game.move(moves[i]);
      bestMove = Math.max(
        bestMove,
        minimax(depth - 1, !maximizingPlayer, alpha, beta)
      );
      alpha = Math.max(alpha, bestMove);
      game.undo();
      if (alpha >= beta) {
        console.log("Broke out of loop");
        break alpha;
      }
    }
    return bestMove;
  } else {
    let bestMove = Infinity;
    beta: for (var i = 0; i < moves.length; i++) {
      game.move(moves[i]);
      bestMove = Math.min(
        bestMove,
        minimax(depth - 1, !maximizingPlayer, alpha, beta)
      );
      beta = Math.min(beta, bestMove);
      game.undo();
      if (alpha <= beta) {
        break beta;
      }
    }
    return bestMove;
  }
}
