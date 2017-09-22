class TicTacToe {
  constructor () {
    this.winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]
    this.playerTurns = { X: [], O: [] }
    this.turn = true

    this.events()
  }
  events () {
    let $td = $('td')

    $td.on('mouseover', context => {
      if (!$(context.target).text()) {
        $(context.target).text(this.currentPlayer()).addClass('hovered')
      }
    })

    $td.on('mouseout', context => {
      if ($(context.target).hasClass('hovered')) {
        $(context.target).text('').removeClass('hovered')
      }
    })

    $td.on('click', context => {
      if ($(context.target).hasClass('hovered')) {
        this.playerTurns[this.currentPlayer()].push($(context.target).index('td'))

        $(context.target).addClass('inactive').removeClass('hovered').text(this.currentPlayer())
        this.winnerCheck()
        this.turn = !this.turn
      }
    })

    $('.newGame').on('click', () => this.newGame())
  }
  newGame () {
    $('td, .winner').text('').removeClass('alert bg-success bg-warning winning inactive gameOver')
    this.playerTurns = { X: [], O: [] }
    this.turn = true
    this.events()
  }
  winnerCheck () {
    let $td = $('td')

    for (let player in this.playerTurns) {
      for (let combination of this.winningCombinations) {
        if (this.playerTurns[player].includes(combination[0]) &&
            this.playerTurns[player].includes(combination[1]) &&
            this.playerTurns[player].includes(combination[2])) {

          $td.filter((index, context) => {
            let dataId = $(context).index('td')
            return dataId === combination[0] ||
              dataId === combination[1] ||
              dataId === combination[2]
          }).removeClass('inactive').addClass('bg-success winning')

          this.announceWinner()
        }
      }
    }
    if (!this.emptyCells()) {
      this.announceWinner(true)
    }
  }
  currentPlayer () {
    return this.turn ? 'X' : 'O'
  }
  emptyCells () {
    return $('td:empty').length
  }
  announceWinner (draw = false) {
    let $winner = $('.winner')
    if (draw) {
      $winner.text('Draw').addClass('alert bg-warning')
    } else {
      $winner.text('Winner: ' + this.currentPlayer()).addClass('alert bg-success')
    }

    $('td').off().addClass('gameOver')
  }
}

new TicTacToe()
