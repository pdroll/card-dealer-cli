import { Card, Suits, Ranks } from '@lib/card'
import { BaseDeck } from '@lib/base-deck'
import times from 'lodash/times'

export class FullDeck extends BaseDeck {
  constructor() {
    super()
    Object.values(Suits).map((suit) => {
      Object.values(Ranks).map((rank) => {
        if (rank > 0) this.cards.push(new Card({ rank, suit }))
      })
    })
  }

  addJokers(numberOfJokers = 2) {
    times(numberOfJokers, () => {
      this.cards.push(new Card({ rank: Ranks.JOKER, suit: Suits.SPADES }))
    })
  }
}

export class EuchreDeck extends FullDeck {
  constructor() {
    super()
    this.cards = this.cards.filter((card) => card.rank >= 9)
  }
}

export class PinochleDeck extends EuchreDeck {
  constructor() {
    super()
    this.cards = [...this.cards, ...this.cards]
  }
}

export class CanastaDeck extends FullDeck {
  constructor() {
    super()
    this.cards = [...this.cards, ...this.cards]
    this.addJokers(4)
  }
}

export type DeckClass =
  | typeof FullDeck
  | typeof EuchreDeck
  | typeof CanastaDeck
  | typeof PinochleDeck

export const deckTypeNames = [
  'standard',
  'euchre',
  'canasta',
  'pinochle',
] as const
export type DeckTypeName = (typeof deckTypeNames)[number]

export const DeckClassMap: Record<DeckTypeName, DeckClass> = {
  standard: FullDeck,
  euchre: EuchreDeck,
  canasta: CanastaDeck,
  pinochle: PinochleDeck,
}
