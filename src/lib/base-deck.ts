import { Hand } from '@lib/hand'
import { Card } from '@lib/card'
import shuffle from 'lodash/shuffle'
import times from 'lodash/times'
import random from 'lodash/random'

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

  showCards() {
    return [...this.cards].map((c) => c.toString())
  }

  private getAboutHalfOfTheCards() {
    const aboutHalf = Math.floor(random(0.3, 0.7, true) * this.count)

    return [this.cards.slice(0, aboutHalf), this.cards.slice(aboutHalf)]
  }

  cut() {
    const [halfA, halfB] = this.getAboutHalfOfTheCards()
    this.cards = [...halfB, ...halfA]
  }

  riffleShuffle(numberOfShuffles = 1) {
    times(numberOfShuffles, () => {
      // Randomize the order of our two stacks
      // because it should be random which stack
      // gets slotted in first
      const stacks = shuffle(this.getAboutHalfOfTheCards())
      const [stackA, stackB] = stacks
      const stackCardCount = Math.max(stackA.length, stackB.length)
      const shuffledCards: Card[] = []

      times(stackCardCount, () => {
        const stackACard = stackA.shift()
        const stackBCard = stackB.shift()

        if (stackACard) shuffledCards.push(stackACard)
        if (stackBCard) shuffledCards.push(stackBCard)
      })

      this.cards = shuffledCards
    })
  }

  randomizedShuffle(numberOfShuffles = 1) {
    times(numberOfShuffles, () => {
      this.cards = shuffle(this.cards)
    })
    return this.showCards()
  }

  takeCard(): Card | null {
    return this.cards.pop() ?? null
  }

  takeRandomCard(): Card | null {
    const cardIndex = random(this.length - 1)
    return this.cards.splice(cardIndex, 1)[0]
  }

  dealHands({
    cardsPerHand = 5,
    numberOfHands = 4,
  }: {
    cardsPerHand?: number
    numberOfHands?: number
  }): Hand[] {
    const hands = Array(numberOfHands)
      .fill(0)
      .map(() => new Hand([]))

    times(cardsPerHand, () => {
      hands.forEach((hand, ix) => {
        const card = this.takeCard()
        if (card) hand.addCard(card)
      })
    })

    return hands
  }
}
