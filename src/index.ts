import { FullDeck, EuchreDeck } from './deck'

const euchreDeck = new EuchreDeck()
const fullDeck = new FullDeck()

console.log('Random Card from a full deck:', `${fullDeck.takeRandomCard()}`)

console.log('\n\n============================\n')

euchreDeck.shuffle(3)

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

console.log('\nKitty')
console.log('==============\n')
console.log(euchreDeck.showCards())
