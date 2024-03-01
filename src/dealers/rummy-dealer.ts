import { DoubleStandardDeck, StandardDeck } from '../lib/deck'

export class RummyDealer {
  private readonly deck: StandardDeck
  private readonly doubleDeck: DoubleStandardDeck

  constructor(deck: StandardDeck, doubleDeck: DoubleStandardDeck) {
    this.deck = deck
    this.doubleDeck = doubleDeck
  }

  deal(players: number) {
    const deck = this.chooseDeck(players)
    const playerHands = deck
      .dealHands({
        cardsPerHand: this.getCardsPerHand(players),
        numberOfHands: players,
      })
      .map((hand, ix) => hand.setName(`Player ${ix + 1}`))

    playerHands.slice(-1)[0].setName('Dealer')

    const turnUp = deck.takeCard()

    return { playerHands, turnUp }
  }

  private chooseDeck(players: number) {
    return players > 6 ? this.doubleDeck : this.deck
  }

  private getCardsPerHand(players: number): number {
    if (players <= 2) return 10
    if (players <= 4) return 7
    if (players <= 6) return 6

    return 7
  }
}
