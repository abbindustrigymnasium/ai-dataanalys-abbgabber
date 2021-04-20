var board = null;
var game = new Chess();
var $status = $("#status");
var $fen = $("#fen");
var $pgn = $("#pgn");
var $mvs = $("#mvs");

function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false;

  // only pick up pieces for the side to move
  if (piece.search(/^b/) !== -1) return false;
}

function makeRandomMove() {
  var possibleMoves = game.moves();
  $mvs.html("");
  for (moves in possibleMoves) {
    $mvs.append(possibleMoves[moves] + " ");
  }
  // game over
  if (possibleMoves.length === 0) return;

  var randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.position(game.fen());
}

function onDrop(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: "q", // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return "snapback";

  window.setTimeout(makeRandomMove, 250);
  updateStatus();
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
  board.position(game.fen());
}

function updateStatus() {
  var status = "";

  var moveColor = "White";
  if (game.turn() === "b") {
    moveColor = "Black";
  }

  // checkmate?
  if (game.in_checkmate()) {
    status = "Game over, " + moveColor + " is in checkmate.";
  }

  // draw?
  else if (game.in_draw()) {
    status = "Game over, drawn position";
  }

  // game still on
  else {
    status = moveColor + " to move";

    // check?
    if (game.in_check()) {
      status += ", " + moveColor + " is in check";
    }
  }

  $status.html(status);
  $fen.html(game.fen());
  $pgn.html(game.pgn());
}

var config = {
  draggable: true,
  position: "start",
  pieceTheme: "lib/chessboardjs-1.0.0/img/chesspieces/wikipedia/{piece}.png",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
};
board = Chessboard("myBoard", config);
