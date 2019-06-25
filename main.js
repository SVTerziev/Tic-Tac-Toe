class TicTacToe {
  constructor () {
    this.players = ['X', 'O']
    this.playerTurns = { [this.players[0]]: [], [this.players[1]]: [] }
    this.winningCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]]
    this.turn = true
    this.cols = [...document.getElementsByTagName('td'))]
    this.events = {
      mouseover: element => {
        if (!element.target.textContent) {
          element.target.textContent = this.currentPlayer()
          element.target.classList.add('hovered')
        }
      },
      mouseout: element => {
        if (element.target.classList.contains('hovered')) {
          element.target.classList.remove('hovered')
          element.target.textContent = ''
        }
      },
      click: element => {
        if (element.target.classList.contains('hovered')) {
          const index = parseInt(element.target.dataset.index)
          const classList = element.target.classList

          classList.add('inactive')
          classList.remove('hovered')
          element.target.textContent = this.currentPlayer()

          this.playerTurns[this.currentPlayer()].push(index)
          this.winnerCheck()
          this.turn = !this.turn
        }
      }
    }
    this.newGame = this.newGame.bind(this)
    this.eventHandler()
  }
  eventHandler () {
    this.cols.forEach(element => {
      element.addEventListener('mouseover', this.events.mouseover)
      element.addEventListener('mouseout', this.events.mouseout)
      element.addEventListener('click', this.events.click)
    })

    document.getElementsByClassName('newGame')[0].addEventListener('click', this.newGame)
  }
  newGame () {
    const winner = document.getElementsByClassName('winner')[0]

    this.cols.forEach(element => {
      element.textContent = ''
      element.classList.remove('winning', 'inactive', 'gameOver', 'bg-success')
    })

    winner.textContent = ''
    winner.classList.remove('alert', 'bg-success', 'bg-warning')

    this.playerTurns = { [this.players[0]]: [], [this.players[1]]: [] }
    this.turn = true

    this.eventHandler()
  }
  winnerCheck () {
    for (let player in this.playerTurns) {
      for (let combination of this.winningCombinations) {
        if (this.playerTurns[player].includes(combination[0]) &&
            this.playerTurns[player].includes(combination[1]) &&
            this.playerTurns[player].includes(combination[2])) {

          const filtered = this.cols.filter(context => {
            const index = parseInt(context.dataset.index)
            return index === combination[0] ||
              index === combination[1] ||
              index === combination[2]
          })

          filtered.forEach(winner => {
            winner.classList.remove('inactive')
            winner.classList.add('winning', 'bg-success')
          })

          this.announceWinner()
        }
      }
    } else if (!this.emptyCells()) {
      this.announceWinner(true)
    }
  }
  currentPlayer () {
    return this.turn ? this.players[0] : this.players[1]
  }
  emptyCells () {
    return this.cols.filter(element => !element.hasChildNodes()).length
  }
  announceWinner (draw = false) {
    const winner = document.getElementsByClassName('winner')[0]

    if (draw) {
      winner.textContent = 'Draw'
      winner.classList.add('alert', 'bg-warning')
    } else {
      winner.textContent = 'Winner: ' + this.currentPlayer()
      winner.classList.add('alert', 'bg-success')
    }

    this.cols.forEach(element => {
      element.classList.add('gameOver')

      element.removeEventListener('mouseover', this.events.mouseover)
      element.removeEventListener('mouseout', this.events.mouseout)
      element.removeEventListener('click', this.events.click)
    })
  }
}

new TicTacToe()
