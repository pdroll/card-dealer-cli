import { EuchreDeck } from '../lib/deck'

export class EuchreDealer {
  private readonly deck: EuchreDeck

  constructor(deck: EuchreDeck) {
    this.deck = deck
  }

  deal() {
    const hands = this.deck
      .dealHands({ cardsPerHand: 5, numberOfHands: 4 })
      .map((hand, ix) => hand.setName(`Player ${ix + 1}`))

    const dealerHand = hands.pop()!
    dealerHand.setName('Dealer')

    const turnUp = this.deck.takeCard()

    return {
      teams: [
        [hands[0], hands[2]],
        [hands[1], dealerHand],
      ],
      turnUp,
    }
  }
}
