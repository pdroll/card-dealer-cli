import { Card, Ranks, Suits } from './card'

describe('Card', () => {
  it('allows its suit and value to be read', () => {
    const card = new Card({ rank: Ranks[8], suit: Suits.SPADES })

    expect(card.rank).toEqual(Ranks[8])
    expect(card.suit).toEqual(Suits.SPADES)
  })

  it('can represent itself as a string', () => {
    const club = new Card({ rank: Ranks[3], suit: Suits.CLUBS })
    const diamond = new Card({ rank: Ranks[10], suit: Suits.DIAMONDS })
    const spade = new Card({ rank: Ranks.J, suit: Suits.SPADES })
    const heart = new Card({ rank: Ranks.A, suit: Suits.HEARTS })
    const joker = new Card({ rank: Ranks.JOKER, suit: Suits.CLUBS })
    expect(typeof club.toString()).toBe('string')
    expect(typeof diamond.toString()).toBe('string')
    expect(typeof spade.toString()).toBe('string')
    expect(typeof heart.toString()).toBe('string')
    expect(typeof joker.toString()).toBe('string')
  })
})
