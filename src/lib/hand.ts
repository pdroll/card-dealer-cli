import orderBy from 'lodash/orderBy'

import { Card } from './card'

export class Hand {
  private cards: Card[]
  public name: string

  constructor(cards: Card[]) {
    this.cards = cards
  }

  get length() {
    return this.cards.length
  }

  get count() {
    return this.length
  }

  setName(name: string) {
    this.name = name
    return this
  }

  addCard(card: Card | null) {
    if (card) this.cards.push(card)
  }

  showCards() {
    return orderBy([...this.cards], ['suit', 'rank'], 'asc')
      .map((c) => c.toString())
      .join('  ')
  }
}
