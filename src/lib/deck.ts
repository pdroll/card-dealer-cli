import { Hand } from '@lib/hand'
import { Card, Suits, Ranks } from '@lib/card'
import shuffle from 'lodash/shuffle'
import times from 'lodash/times'
import random from 'lodash/random'

export abstract class Deck {
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

  shuffle(numberOfShuffles = 1) {
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

export class FullDeck extends Deck {
  constructor() {
    super()
    Object.values(Suits).map((suit) => {
      Object.values(Ranks).map((rank) => {
        this.cards.push(new Card({ rank, suit }))
      })
    })
  }
}

export class EuchreDeck extends FullDeck {
  constructor() {
    super()
    this.cards = this.cards.filter((card) => card.rank >= 9)
  }
}
