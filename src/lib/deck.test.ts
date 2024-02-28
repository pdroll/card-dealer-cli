import uniqBy from 'lodash/uniqBy'

import { Ranks } from './card'
import { CanastaDeck, EuchreDeck, PinochleDeck, StandardDeck } from './deck'

describe('StandardDeck', () => {
  it('has 52 cards with 4 suits and 13 ranks', () => {
    const deck = new StandardDeck()
    expect(deck.count).toBe(52)

    const ranks = uniqBy(deck.getCards(), (c) => c.rank)
    expect(ranks.length).toBe(13)

    const suits = uniqBy(deck.getCards(), (c) => c.suit)
    expect(suits.length).toBe(4)
  })

  it('has no jokers', () => {
    const deck = new StandardDeck()

    deck.getCards().forEach((card) => {
      expect(card.rank).not.toBe(Ranks.JOKER)
    })
  })
})

describe('EuchreDeck', () => {
  it('has 24 cards with 4 suits and 6 ranks', () => {
    const deck = new EuchreDeck()
    expect(deck.count).toBe(24)

    const ranks = uniqBy(deck.getCards(), (c) => c.rank)
    expect(ranks.length).toBe(6)

    const suits = uniqBy(deck.getCards(), (c) => c.suit)
    expect(suits.length).toBe(4)
  })

  it('has no jokers or cards lower than 9', () => {
    const deck = new EuchreDeck()

    deck.getCards().forEach((card) => {
      expect(card.rank).not.toBe(Ranks.JOKER)
      expect(card.rank).not.toBeLessThan(Ranks['9'])
    })
  })
})

describe('PinochleDeck', () => {
  it('has 48 cards with 4 suits and 6 ranks', () => {
    const deck = new PinochleDeck()
    expect(deck.count).toBe(48)

    const ranks = uniqBy(deck.getCards(), (c) => c.rank)
    expect(ranks.length).toBe(6)

    const suits = uniqBy(deck.getCards(), (c) => c.suit)
    expect(suits.length).toBe(4)
  })

  it('has no jokers or cards lower than 9', () => {
    const deck = new PinochleDeck()

    deck.getCards().forEach((card) => {
      expect(card.rank).not.toBe(Ranks.JOKER)
      expect(card.rank).not.toBeLessThan(Ranks['9'])
    })
  })
})

describe('CanastaDeck', () => {
  it('has 108 cards with 4 suits and 14 ranks', () => {
    const deck = new CanastaDeck()
    expect(deck.count).toBe(108)

    const ranks = uniqBy(deck.getCards(), (c) => c.rank)
    expect(ranks.length).toBe(14)

    const suits = uniqBy(deck.getCards(), (c) => c.suit)
    expect(suits.length).toBe(4)
  })

  it('has 4 jokers', () => {
    const deck = new CanastaDeck()

    const jokers = deck.getCards().filter((c) => c.rank === Ranks.JOKER)
    expect(jokers).toHaveLength(4)
  })
})
