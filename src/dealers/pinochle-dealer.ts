import { PinochleDeck } from '../lib/deck'

export class PinochleDealer {
  private readonly deck: PinochleDeck

  constructor(deck: PinochleDeck) {
    this.deck = deck
  }

  deal() {
    const playerHands = this.deck.dealHands({
      cardsPerHand: 12,
      numberOfHands: 2,
    })

    playerHands[0].setName('Player 1')
    playerHands[1].setName('Dealer')

    const turnUp = this.deck.takeCard()

    return { playerHands, turnUp }
  }
}
