import { type Rank, Ranks } from '../lib/card'
import { CanastaDeck } from '../lib/deck'
import { CanastaDealer } from './canasta-dealer'

describe('CanastaDealer', () => {
  it('deals 11 cards to two teams of two players', () => {
    const deck = new CanastaDeck()
    const dealer = new CanastaDealer(deck)
    const { teams } = dealer.deal()

    expect(teams.length).toBe(2)

    teams.forEach((hands) => {
      expect(hands.length).toBe(2)
      hands.forEach((hand) => expect(hand.count).toBe(11))
    })
  })

  it('sets the name of the hands', () => {
    const deck = new CanastaDeck()
    const dealer = new CanastaDealer(deck)
    const { teams } = dealer.deal()

    expect(teams[0][0].name).toBe('Player 1')
    expect(teams[0][1].name).toBe('Player 3')
    expect(teams[1][0].name).toBe('Player 2')
    expect(teams[1][1].name).toBe('Dealer')
  })

  it('turns up a card', () => {
    const deck = new CanastaDeck()
    const dealer = new CanastaDealer(deck)
    const { turnUp } = dealer.deal()

    expect(turnUp?.rank).toBeDefined()
    expect(turnUp?.suit).toBeDefined()
  })

  const invalidTurnUpRanks: Rank[] = [Ranks.JOKER, Ranks['2'], Ranks['3']]
  test.each(Array(10).fill(null))(
    'the turn up a card is not a Joker, 2, or 3',
    () => {
      const deck = new CanastaDeck()
      deck.randomizedShuffle()
      const dealer = new CanastaDealer(deck)
      const { turnUp } = dealer.deal()

      expect(invalidTurnUpRanks.includes(turnUp?.rank)).toBeFalsy()
    },
  )
})
