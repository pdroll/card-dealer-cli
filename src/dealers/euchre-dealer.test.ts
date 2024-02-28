import { EuchreDeck } from '../lib/deck'
import { EuchreDealer } from './euchre-dealer'

describe('EuchreDealer', () => {
  it('deals 5 cards to two teams of two players', () => {
    const deck = new EuchreDeck()
    const dealer = new EuchreDealer(deck)
    const { teams } = dealer.deal()

    expect(teams.length).toBe(2)

    teams.forEach((hands) => {
      expect(hands.length).toBe(2)
      hands.forEach((hand) => expect(hand.count).toBe(5))
    })
  })

  it('sets the name of the hands', () => {
    const deck = new EuchreDeck()
    const dealer = new EuchreDealer(deck)
    const { teams } = dealer.deal()

    expect(teams[0][0].name).toBe('Player 1')
    expect(teams[0][1].name).toBe('Player 3')
    expect(teams[1][0].name).toBe('Player 2')
    expect(teams[1][1].name).toBe('Dealer')
  })

  it('turns up a card', () => {
    const deck = new EuchreDeck()
    const dealer = new EuchreDealer(deck)
    const { turnUp } = dealer.deal()

    expect(turnUp?.rank).toBeDefined()
    expect(turnUp?.suit).toBeDefined()
  })
})
