import { StandardDeck } from './deck'

describe('BaseDeck', () => {
  it('can show all cards as a string', () => {
    const deck = new StandardDeck()
    expect(typeof deck.showCards()).toBe('string')
  })

  describe('cut', () => {
    it('changes the order of the cards in the deck', () => {
      const deck = new StandardDeck()
      const cutDeck = new StandardDeck()
      cutDeck.cut()

      expect(deck.count).toBe(cutDeck.count)
      expect(deck.showCards()).not.toBe(cutDeck.showCards())
      expect(deck.getCards()[0]).not.toEqual(cutDeck.getCards()[0])
    })
  })

  describe('riffleShuffle', () => {
    it('changes the order of the cards in the deck', () => {
      const deck = new StandardDeck()
      const shuffledDeck = new StandardDeck()
      shuffledDeck.riffleShuffle()

      expect(deck.count).toBe(shuffledDeck.count)
      expect(deck.showCards()).not.toBe(shuffledDeck.showCards())
    })

    it('can be shuffled multiple times', () => {
      const deck = new StandardDeck()
      const shuffledDeck = new StandardDeck()
      shuffledDeck.riffleShuffle(3, true)

      expect(deck.count).toBe(shuffledDeck.count)
      expect(deck.showCards()).not.toBe(shuffledDeck.showCards())
    })
  })

  describe('randomizedShuffle', () => {
    it('changes the order of the cards in the deck', () => {
      const deck = new StandardDeck()
      const shuffledDeck = new StandardDeck()
      shuffledDeck.randomizedShuffle()

      expect(deck.count).toBe(shuffledDeck.count)
      expect(deck.showCards()).not.toBe(shuffledDeck.showCards())
    })

    it('can be shuffled multiple times', () => {
      const deck = new StandardDeck()
      const shuffledDeck = new StandardDeck()
      shuffledDeck.randomizedShuffle(3)

      expect(deck.count).toBe(shuffledDeck.count)
      expect(deck.showCards()).not.toBe(shuffledDeck.showCards())
    })
  })

  describe('takeCard', () => {
    it('removes a card from the top of the deck', () => {
      const deck = new StandardDeck()
      const workingDeck = new StandardDeck()
      const card = workingDeck.takeCard()

      expect(workingDeck.length).toBe(deck.length - 1)
      expect(deck.getCards()[deck.count - 1]).toEqual(card)
      expect(workingDeck.getCards()[workingDeck.count - 1]).not.toEqual(card)
    })

    describe('when the deck has no remaining cards', () => {
      it('returns null', () => {
        const deck = new StandardDeck()
        deck.takeCards(deck.count)
        const card = deck.takeCard()

        expect(card).toBe(null)
      })
    })
  })

  describe('takeCards', () => {
    it('removes multiple card from the top of the deck', () => {
      const deck = new StandardDeck()
      const workingDeck = new StandardDeck()
      const card = workingDeck.takeCards(3)

      expect(workingDeck.length).toBe(deck.length - 3)
      expect(deck.getCards()[deck.count - 1]).toEqual(card[0])
      expect(deck.getCards()[deck.count - 2]).toEqual(card[1])
      expect(deck.getCards()[deck.count - 3]).toEqual(card[2])
    })
  })

  describe('takeRandomCard', () => {
    it('removes a random card from the deck', () => {
      const deck = new StandardDeck()
      const workingDeck = new StandardDeck()
      const card = workingDeck.takeRandomCard()

      expect(workingDeck.length).toBe(deck.length - 1)
      expect(deck.getCards()[deck.count - 1]).not.toEqual(card)
    })
  })

  describe('dealHands', () => {
    it('creates the specified number of hands', () => {
      const deck = new StandardDeck()
      const hands = deck.dealHands({ cardsPerHand: 5, numberOfHands: 4 })

      expect(hands).toHaveLength(4)
      hands.forEach((hand) => {
        expect(hand).toHaveLength(5)
      })
    })

    it('removes those cards from the deck', () => {
      const deck = new StandardDeck()
      const workingDeck = new StandardDeck()
      workingDeck.dealHands({ cardsPerHand: 6, numberOfHands: 3 })

      expect(workingDeck.length).toBe(deck.length - 18) // 6 * 3 = 18
    })
  })
})
