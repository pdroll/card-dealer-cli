import { StandardDeck } from '../lib/deck'
import { GinDealer } from './gin-dealer'

describe('GinDealer', () => {
  it('deals 10 cards to two players', () => {
    const deck = new StandardDeck()
    const dealer = new GinDealer(deck)
    const { playerHands } = dealer.deal()

    expect(playerHands.length).toBe(2)

    playerHands.forEach((hand) => expect(hand.count).toBe(10))
  })

  it('sets the name of the hands', () => {
    const deck = new StandardDeck()
    const dealer = new GinDealer(deck)
    const { playerHands } = dealer.deal()

    expect(playerHands[0].name).toBe('Player 1')
    expect(playerHands[1].name).toBe('Dealer')
  })

  it('turns up a card', () => {
    const deck = new StandardDeck()
    const dealer = new GinDealer(deck)
    const { turnUp } = dealer.deal()

    expect(turnUp?.rank).toBeDefined()
    expect(turnUp?.suit).toBeDefined()
  })
})
