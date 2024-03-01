import { StandardDeck } from '../lib/deck'
import { BlackjackDealer } from './blackjack-dealer'

describe('BlackjackDealer', () => {
  it('deals two cards to every player and to the dealer', () => {
    const deck = new StandardDeck()
    const dealer = new BlackjackDealer(deck)
    const { playerHands, dealerHand } = dealer.deal(5)

    expect(playerHands.length).toBe(5)
    playerHands.forEach((hand) => expect(hand.count).toBe(2))
    expect(dealerHand.count).toBe(2)
  })

  it('sets the name of the hands', () => {
    const deck = new StandardDeck()
    const dealer = new BlackjackDealer(deck)
    const { playerHands, dealerHand } = dealer.deal(2)

    expect(playerHands[0].name).toBe('Player 1')
    expect(playerHands[1].name).toBe('Player 2')
    expect(dealerHand.name).toBe('Dealer')
  })
})
