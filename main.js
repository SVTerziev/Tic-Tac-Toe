class TicTacToe {
  constructor() {
    this.winningCombinations = [['00', '01', '02'], ['10', '11', '12'], ['20', '21', '22'], ['00', '10', '20'], ['01', '11', '21'], ['02', '12', '22'], ['00', '11', '22'], ['20', '11', '02']];
    this.playerTurns = { X: [], O: [] };
    this.turn = true;
    
    this.events();
  }
  events() {
    let $td = $('td');
    
    $td.on('mouseover', function (context) {
      if (!$(context.target).text()) {
        $(context.target).text(this.currentPlayer()).addClass('hovered');;
      }
    }.bind(this));
    
    $td.on('mouseout', function () {
      if($(this).hasClass('hovered')) {
        $(this).text('').removeClass('hovered');
      }
    })
    
    $td.on('click', function (context) {
      if ($(context.target).hasClass('hovered')) {
        this.playerTurns[this.currentPlayer()].push($(context.target).data('id').toString());
        
        $(context.target).addClass('inactive').removeClass('hovered').text(this.currentPlayer());
        this.winnerCheck();
        this.turn = !this.turn;
      }
    }.bind(this));
    
    $('.newGame').on('click', function () {
      this.newGame();
    }.bind(this));
  }
  newGame() {
    $('td, .winner').text('').removeClass('alert bg-success bg-warning winning inactive gameOver');
    this.playerTurns = { X: [], O: [] };
    this.turn = true;
    this.events();
  }
  winnerCheck() {
    let $td = $('td');
    
    for (let player in this.playerTurns) {
      for (let combination in this.winningCombinations) {
        if (this.playerTurns[player].includes(this.winningCombinations[combination][0]) &&
            this.playerTurns[player].includes(this.winningCombinations[combination][1]) &&
            this.playerTurns[player].includes(this.winningCombinations[combination][2])) {

          $td.filter(function (index, context) {
            let dataId = $(context).data('id').toString();
            return dataId === this.winningCombinations[combination][0] ||
              dataId === this.winningCombinations[combination][1] ||
              dataId === this.winningCombinations[combination][2];
          }.bind(this)).removeClass('inactive').addClass('bg-success winning');

          this.announceWinner();

          return;
        }
      }
    }
    if (!this.emptyCells()) {
      this.announceWinner(true);
    }
  }
  currentPlayer() {
    return this.turn ? 'X' : 'O';
  }
  emptyCells() {
    return $('td').filter(function () {
      return !$(this).text();
    }).length;
  }
  announceWinner(draw = false) {
    let $winner = $('.winner');
    if (draw) {
      $winner.text('Draw').addClass('alert bg-warning');
    } else {
      $winner.text('Winner: ' + this.currentPlayer()).addClass('alert bg-success');
    }

    $('td').off().addClass('gameOver');
  }
}

new TicTacToe();