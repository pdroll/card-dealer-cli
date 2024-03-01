import { DoubleStandardDeck, StandardDeck } from '../lib/deck'
import { RummyDealer } from './rummy-dealer'

const itDealsFromTheStandardDeck = (playerCount: number) => {
  it('deals from the standard deck', () => {
    const deck = new StandardDeck()
    const doubleDeck = new DoubleStandardDeck()
    const workingDeck = new StandardDeck()
    const workingDoubleDeck = new DoubleStandardDeck()

    const dealer = new RummyDealer(workingDeck, workingDoubleDeck)
    dealer.deal(playerCount)

    expect(workingDoubleDeck.count).toEqual(doubleDeck.count)
    expect(workingDeck.count).toBeLessThan(deck.count)
  })
}

const itTurnsUpACard = (playerCount: number) => {
  it('turns up a card', () => {
    const deck = new StandardDeck()
    const doubleDeck = new DoubleStandardDeck()
    const dealer = new RummyDealer(deck, doubleDeck)

    const { turnUp } = dealer.deal(playerCount)

    expect(turnUp?.rank).toBeDefined()
    expect(turnUp?.suit).toBeDefined()
  })
}

describe('RummyDealer', () => {
  describe('when there are two players', () => {
    const playerCount = 2
    it('deals 10 cards to every player', () => {
      const deck = new StandardDeck()
      const doubleDeck = new StandardDeck()
      const dealer = new RummyDealer(deck, doubleDeck)
      const { playerHands } = dealer.deal(playerCount)

      expect(playerHands.length).toBe(playerCount)
      playerHands.forEach((hand) => expect(hand.count).toBe(10))
    })

    itDealsFromTheStandardDeck(playerCount)
    itTurnsUpACard(playerCount)
  })

  describe('when there are four players', () => {
    const playerCount = 4
    it('deals 7 cards to every player', () => {
      const deck = new StandardDeck()
      const doubleDeck = new StandardDeck()
      const dealer = new RummyDealer(deck, doubleDeck)
      const { playerHands } = dealer.deal(playerCount)

      expect(playerHands.length).toBe(playerCount)
      playerHands.forEach((hand) => expect(hand.count).toBe(7))
    })

    itDealsFromTheStandardDeck(playerCount)
    itTurnsUpACard(playerCount)
  })

  describe('when there are 6 players', () => {
    const playerCount = 6
    it('deals 7 cards to every player', () => {
      const deck = new StandardDeck()
      const doubleDeck = new DoubleStandardDeck()
      const dealer = new RummyDealer(deck, doubleDeck)
      const { playerHands } = dealer.deal(playerCount)

      expect(playerHands.length).toBe(playerCount)
      playerHands.forEach((hand) => expect(hand.count).toBe(6))
    })

    itDealsFromTheStandardDeck(playerCount)
    itTurnsUpACard(playerCount)
  })

  describe('when there are 8 players', () => {
    const playerCount = 8
    it('deals 7 cards to every player', () => {
      const deck = new StandardDeck()
      const doubleDeck = new DoubleStandardDeck()
      const dealer = new RummyDealer(deck, doubleDeck)
      const { playerHands } = dealer.deal(playerCount)

      expect(playerHands.length).toBe(playerCount)

      playerHands.forEach((hand) => expect(hand.count).toBe(7))
    })

    it('deals from the double deck', () => {
      const deck = new StandardDeck()
      const doubleDeck = new DoubleStandardDeck()
      const workingDeck = new StandardDeck()
      const workingDoubleDeck = new DoubleStandardDeck()

      const dealer = new RummyDealer(workingDeck, workingDoubleDeck)
      dealer.deal(playerCount)

      expect(workingDeck.count).toEqual(deck.count)
      expect(workingDoubleDeck.count).toBeLessThan(doubleDeck.count)
    })

    itTurnsUpACard(playerCount)
  })
})
