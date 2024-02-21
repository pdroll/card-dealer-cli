export const Suits = {
  CLUBS: '♧',
  DIAMONDS: '♦',
  HEARTS: '♥',
  SPADES: '♤',
} as const
export type Suit = (typeof Suits)[keyof typeof Suits]

export const Ranks = {
  JOKER: 0,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
} as const

export type Rank = (typeof Ranks)[keyof typeof Ranks]

export class Card {
  public suit: Suit
  public rank: Rank

  constructor({ suit, rank }: { suit: Suit; rank: Rank }) {
    this.suit = suit
    this.rank = rank
  }

  toString() {
    const rankName = Object.keys(Ranks).find((rankName) => {
      if (Ranks[rankName] === this.rank) return rankName
    })

    if (this.rank === Ranks.JOKER) return 'Joker'
    return `${this.suit} ${rankName}`
  }
}