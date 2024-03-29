import random from 'lodash/random'
import shuffle from 'lodash/shuffle'
import times from 'lodash/times'

import { Card } from './card'
import { Hand } from './hand'

export abstract class BaseDeck {
  protected cards: Card[]

  constructor() {
    this.cards = []
  }

  get length() {
    return this.cards.length
  }

  get count() {
    return this.length
  }

  getCards() {
    return [...this.cards]
  }

  showCards() {
    return this.getCards()
      .map((c) => c.toString())
      .join(' | ')
  }

  private getAboutHalfOfTheCards(exacltyHalf = false) {
    const splitPercentage = exacltyHalf ? 0.5 : random(0.4, 0.6, true)
    const aboutHalf = Math.floor(splitPercentage * this.count)

    return [this.cards.slice(0, aboutHalf), this.cards.slice(aboutHalf)]
  }

  cut() {
    const [halfA, halfB] = this.getAboutHalfOfTheCards()
    this.cards = [...halfB, ...halfA]
  }

  riffleShuffle(numberOfShuffles = 1, perfectShuffle = false) {
    times(numberOfShuffles, () => {
      // Randomize the order of our two stacks
      // to randomize if it will be an "in shuffle" or an "out shuffle"
      // https://link.pdroll.com/riffle
      const stacks = shuffle(this.getAboutHalfOfTheCards(perfectShuffle))
      const [stackA, stackB] = stacks

      const shuffledCards: Card[] = []

      do {
        const maxTake = perfectShuffle ? 1 : 3
        const stackATake = Math.min(random(1, maxTake), stackA.length)
        times(stackATake, () => {
          const stackACard = stackA.shift()
          if (stackACard) shuffledCards.push(stackACard)
        })

        const stackBTake = Math.min(random(1, maxTake), stackB.length)
        times(stackBTake, () => {
          const stackBCard = stackB.shift()
          if (stackBCard) shuffledCards.push(stackBCard)
        })
      } while (stackA.length > 0 || stackB.length > 0)

      this.cards = shuffledCards
    })

    return this
  }

  randomizedShuffle(numberOfShuffles = 1) {
    times(numberOfShuffles, () => {
      this.cards = shuffle(this.cards)
    })
    return this
  }

  takeCard(): Card | null {
    return this.cards.pop() ?? null
  }

  takeCards(numberOfCards: number): Card[] {
    const cards: Card[] = []

    times(numberOfCards, () => {
      const card = this.takeCard()
      if (card) cards.push(card)
    })

    return cards
  }

  takeRandomCard(): Card | null {
    const cardIndex = random(this.length - 2)
    return this.cards.splice(cardIndex, 1)[0]
  }

  dealHands({
    cardsPerHand = 5,
    numberOfHands = 4,
  }: {
    cardsPerHand?: number
    numberOfHands?: number
  } = {}): Hand[] {
    const hands = Array(numberOfHands)
      .fill(0)
      .map(() => new Hand([]))

    times(cardsPerHand, () => {
      hands.forEach((hand) => {
        const card = this.takeCard()
        if (card) hand.addCard(card)
      })
    })

    return hands
  }
}
