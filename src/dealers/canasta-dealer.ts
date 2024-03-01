import { Card, type Rank, Ranks } from '../lib/card'
import { CanastaDeck } from '../lib/deck'

export class CanastaDealer {
  private readonly deck: CanastaDeck

  constructor(deck: CanastaDeck) {
    this.deck = deck
  }

  deal() {
    const hands = this.deck
      .dealHands({ numberOfHands: 4, cardsPerHand: 11 })
      .map((hand, ix) => hand.setName(`Player ${ix + 1}`))

    const dealerHand = hands.pop()!
    dealerHand.setName('Dealer')

    const turnUp = this.turnUpCard()

    return {
      teams: [
        [hands[0], hands[2]],
        [hands[1], dealerHand],
      ],
      turnUp,
    }
  }

  private turnUpCard(): Card {
    const invalidTurnUpRanks: Rank[] = [Ranks.JOKER, Ranks['2'], Ranks['3']]
    let turnUpCard: Card | null = null

    do {
      const candidate = this.deck.takeCard()

      if (candidate && !invalidTurnUpRanks.includes(candidate.rank)) {
        turnUpCard = candidate
      }
    } while (!turnUpCard)

    return turnUpCard
  }
}
