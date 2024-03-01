import { StandardDeck } from '../lib/deck'

export class GinDealer {
  private readonly deck: StandardDeck

  constructor(deck: StandardDeck) {
    this.deck = deck
  }

  deal() {
    const playerHands = this.deck.dealHands({
      cardsPerHand: 10,
      numberOfHands: 2,
    })
    playerHands[0].setName('Player 1')
    playerHands[1].setName('Dealer')

    const turnUp = this.deck.takeCard()

    return { playerHands, turnUp }
  }
}
