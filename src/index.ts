import { FullDeck, EuchreDeck, CanastaDeck } from '@lib/deck'

const euchreDeck = new EuchreDeck()
const fullDeck = new FullDeck()
fullDeck.addJokers()

console.log(
  'Three Random Cards from a full deck with jokers:',
  `${fullDeck.takeRandomCard()}`,
  `${fullDeck.takeRandomCard()}`,
  `${fullDeck.takeRandomCard()}`,
)

console.log('\n\n============================\n')

euchreDeck.riffleShuffle(7)
euchreDeck.cut()

const hands = euchreDeck.dealHands({ cardsPerHand: 5, numberOfHands: 4 })

console.log("\nDealer's team")
console.log('==============\n')

console.log('Dealer', hands[3].showCards())
console.log('Player B', hands[1].showCards())

console.log('\n\nOther team')
console.log('==============\n')

console.log('Player C', hands[0].showCards())
console.log('Player D', hands[2].showCards())

const turnedUp = euchreDeck.takeCard()

console.log('\n\nTurned Up')
console.log('==============\n')
console.log(turnedUp?.toString())

console.log('\nKitty', euchreDeck.showCards())
