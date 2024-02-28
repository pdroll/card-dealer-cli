import times from 'lodash/times'

import { BaseDeck } from './base-deck'
import { Card, Ranks, Suits } from './card'

export class StandardDeck extends BaseDeck {
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

export class EuchreDeck extends StandardDeck {
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

export class CanastaDeck extends StandardDeck {
  constructor() {
    super()
    this.cards = [...this.cards, ...this.cards]
    this.addJokers(4)
  }
}

export type DeckClass =
  | typeof StandardDeck
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
  standard: StandardDeck,
  euchre: EuchreDeck,
  canasta: CanastaDeck,
  pinochle: PinochleDeck,
}
