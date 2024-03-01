import { Card, Ranks, Suits } from './card'
import { Hand } from './hand'

describe('Hand', () => {
  it('can be intialized with cards', () => {
    const card1 = new Card({ rank: Ranks[8], suit: Suits.SPADES })
    const card2 = new Card({ rank: Ranks[6], suit: Suits.HEARTS })
    const card3 = new Card({ rank: Ranks.Q, suit: Suits.DIAMONDS })
    const hand = new Hand([card1, card2, card3])

    expect(hand.count).toBe(3)
    expect(hand.length).toBe(3)
  })

  it('can have cards added to it after being initialized', () => {
    const card1 = new Card({ rank: Ranks[2], suit: Suits.CLUBS })
    const hand = new Hand([card1])

    expect(hand.count).toBe(1)
    expect(hand.length).toBe(1)

    const card2 = new Card({ rank: Ranks[4], suit: Suits.HEARTS })
    const card3 = new Card({ rank: Ranks[7], suit: Suits.DIAMONDS })
    const card4 = new Card({ rank: Ranks.K, suit: Suits.SPADES })

    hand.addCard(card2)
    hand.addCard(card3)
    hand.addCard(card4)

    expect(hand.count).toBe(4)
    expect(hand.length).toBe(4)
  })

  it('can show all cards as a string', () => {
    const card1 = new Card({ rank: Ranks[8], suit: Suits.SPADES })
    const card2 = new Card({ rank: Ranks[2], suit: Suits.SPADES })
    const hand = new Hand([card1, card2])
    expect(typeof hand.showCards()).toBe('string')
  })
})
