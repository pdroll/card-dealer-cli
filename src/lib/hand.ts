import { Card } from './card'
import orderBy from 'lodash/orderBy'

export class Hand {
  private cards: Card[]

  constructor(cards: Card[]) {
    this.cards = cards
  }

  get length() {
    return this.cards.length
  }

  get count() {
    return this.length
  }

  addCard(card: Card) {
    this.cards.push(card)
  }

  showCards() {
    return orderBy([...this.cards], ['suit', 'rank'], 'asc')
      .map((c) => c.toString())
      .join('  ')
  }
}
