import { StandardDeck } from '../lib/deck'
import { PokerDealer } from './poker-dealer'

describe('PokerDealer', () => {
  it('deals two cards to every player and 5 board cards', () => {
    const deck = new StandardDeck()
    const dealer = new PokerDealer(deck)
    const { playerHands, boardCards } = dealer.deal(4)

    expect(playerHands.length).toBe(4)
    playerHands.forEach((hand) => expect(hand.count).toBe(2))
    expect(boardCards.length).toBe(5)
  })

  it('burns three cards while dealing', () => {
    const deck = new StandardDeck()
    const workingDeck = new StandardDeck()
    const dealer = new PokerDealer(workingDeck)
    dealer.deal(6)

    expect(workingDeck.count).toBe(deck.count - 20) // (6 * 2) + 5 board + 3 burned = 20
  })

  it('sets the name of the hands', () => {
    const deck = new StandardDeck()
    const dealer = new PokerDealer(deck)
    const { playerHands } = dealer.deal(3)

    expect(playerHands[0].name).toBe('Player 1')
    expect(playerHands[1].name).toBe('Player 2')
    expect(playerHands[2].name).toBe('Player 3')
  })
})
