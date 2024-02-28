import { StandardDeck } from '../lib/deck'

export class PokerDealer {
  private readonly deck: StandardDeck

  constructor(deck: StandardDeck) {
    this.deck = deck
  }

  deal(players: number) {
    const playerHands = this.deck
      .dealHands({
        cardsPerHand: 2,
        numberOfHands: players,
      })
      .map((hand, ix) => hand.setName(`Player ${ix + 1}`))

    this.deck.takeCard() // Burn card
    const flop = this.deck.takeCards(3)

    this.deck.takeCard() // Burn card
    const turn = this.deck.takeCard()!

    this.deck.takeCard() // Burn card
    const river = this.deck.takeCard()!

    return { playerHands, boardCards: [...flop, turn, river] }
  }
}
