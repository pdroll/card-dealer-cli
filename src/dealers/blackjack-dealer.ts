import { StandardDeck } from '../lib/deck'

export class BlackjackDealer {
  private readonly deck: StandardDeck

  constructor(deck: StandardDeck) {
    this.deck = deck
  }

  deal(players: number) {
    const hands = this.deck
      .dealHands({
        cardsPerHand: 2,
        numberOfHands: players + 1,
      })
      .map((hand, ix) => hand.setName(`Player ${ix + 1}`))

    const dealerHand = hands.pop()!
    dealerHand.setName('Dealer')

    return { playerHands: hands, dealerHand }
  }
}
