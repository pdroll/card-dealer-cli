import { PinochleDeck } from '../lib/deck'
import { PinochleDealer } from './pinochle-dealer'

describe('PinochleDealer', () => {
  it('deals 12 cards to two players', () => {
    const deck = new PinochleDeck()
    const dealer = new PinochleDealer(deck)
    const { playerHands } = dealer.deal()

    expect(playerHands.length).toBe(2)

    playerHands.forEach((hand) => expect(hand.count).toBe(12))
  })

  it('sets the name of the hands', () => {
    const deck = new PinochleDeck()
    const dealer = new PinochleDealer(deck)
    const { playerHands } = dealer.deal()

    expect(playerHands[0].name).toBe('Player 1')
    expect(playerHands[1].name).toBe('Dealer')
  })

  it('turns up a card', () => {
    const deck = new PinochleDeck()
    const dealer = new PinochleDealer(deck)
    const { turnUp } = dealer.deal()

    expect(turnUp?.rank).toBeDefined()
    expect(turnUp?.suit).toBeDefined()
  })
})
