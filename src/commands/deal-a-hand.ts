import { StandardDeck, EuchreDeck, CanastaDeck, PinochleDeck } from '@lib/deck'
import {
  type GlobalOpts,
  type DealAHandOpts,
  gameTypes,
  GameType,
} from '@commands/types'
import prompts from 'prompts'
import capitalize from 'lodash/capitalize'
import chalk from 'chalk'
import { shuffleAndCutDeck } from '@commands/shuffle-and-cut-deck'
import { Rank, Ranks } from '@lib/card'

interface DealAHandOptions extends DealAHandOpts, GlobalOpts {}

export const dealAHandHandler = async (opts: DealAHandOptions) => {
  let game: GameType | undefined = opts.game
  if (opts.game === undefined) {
    const answer = await prompts({
      type: 'select',
      name: 'game',
      message: 'What card game should we deal a hand for?',
      choices: gameTypes.map((g) => ({ title: capitalize(g), value: g })),
    })

    game = answer.game
  }

  switch (game) {
    case 'blackjack':
      return dealBlackjack(opts)
    case 'poker':
      return dealPoker(opts)
    case 'euchre':
      return dealEuchre(opts)
    case 'pinochle':
      return dealPinochle(opts)
    case 'canasta':
      return dealCanasta(opts)
    default:
      console.error(chalk.bold.red('You must choose a card game!'))
      return
  }
}

const promptPlayers = async (): Promise<number> => {
  const { players }: { players: number } = await prompts({
    type: 'number',
    name: 'players',
    message: 'How many players?',
  })

  return players
}

const dealBlackjack = async (opts: DealAHandOptions) => {
  const deck = await shuffleAndCutDeck(new StandardDeck(), opts)
  const players = await promptPlayers()
  const hands = deck.dealHands({ cardsPerHand: 2, numberOfHands: players + 1 })

  hands.map((hand, ix) => {
    const handName = ix >= players ? 'Dealer' : `Player ${ix + 1}`
    console.log(chalk.bold.underline(`\n${handName}`))
    console.log(hand.showCards())
  })
}

const dealPoker = async (opts: DealAHandOptions) => {
  const deck = await shuffleAndCutDeck(new StandardDeck(), opts)
  const players = await promptPlayers()
  const hands = deck.dealHands({ cardsPerHand: 2, numberOfHands: players })

  hands.map((hand, ix) => {
    console.log(chalk.bold.underline(`\nPlayer ${ix + 1}`))
    console.log(hand.showCards())
  })

  deck.takeCard() // Burn card
  const flop = deck.takeCards(3)

  deck.takeCard() // Burn card
  const turn = deck.takeCard()

  deck.takeCard() // Burn card
  const river = deck.takeCard()

  console.log(chalk.italic.underline('\nBoard'))
  console.log([...flop, turn, river].join('  '))
}

const dealEuchre = async (opts: DealAHandOptions) => {
  const deck = await shuffleAndCutDeck(new EuchreDeck(), opts)
  const hands = deck.dealHands({ cardsPerHand: 5, numberOfHands: 4 })

  console.log(chalk.bold.underline(`\nTeam A`))
  console.log(`Player 1:  ${hands[0].showCards()}`)
  console.log(`Player 3:  ${hands[2].showCards()}`)

  console.log(chalk.bold.underline(`\nTeam B`))
  console.log(`Player 2:  ${hands[1].showCards()}`)
  console.log(`Dealer:    ${hands[3].showCards()}`)

  const turnUp = deck.takeCard()
  console.log(chalk.underline(`\nTurn Up`))
  console.log(`${turnUp}`)
}

const dealPinochle = async (opts: DealAHandOptions) => {
  const deck = await shuffleAndCutDeck(new PinochleDeck(), opts)
  const hands = deck.dealHands({ numberOfHands: 2, cardsPerHand: 12 })

  console.log(chalk.bold.underline(`\nPlayer 1`))
  console.log(hands[0].showCards())

  console.log(chalk.bold.underline(`\nPlayer 2`))
  console.log(hands[1].showCards())

  const turnUp = deck.takeCard()
  console.log(chalk.underline(`\nTurn Up`))
  console.log(`${turnUp}`)
}

const dealCanasta = async (opts: DealAHandOptions) => {
  const deck = await shuffleAndCutDeck(new CanastaDeck(), opts)
  const hands = deck.dealHands({ numberOfHands: 4, cardsPerHand: 11 })

  console.log(chalk.bold.underline(`\nTeam A`))
  console.log(`Player 1:  ${hands[0].showCards()}`)
  console.log(`Player 3:  ${hands[2].showCards()}`)

  console.log(chalk.bold.underline(`\nTeam B`))
  console.log(`Player 2:  ${hands[1].showCards()}`)
  console.log(`Dealer:    ${hands[3].showCards()}`)

  console.log(chalk.underline(`\nTurn Up`))
  const invalidTurnUpRanks: Rank[] = [Ranks.JOKER, Ranks['2'], Ranks['3']]
  let validTurnUp = false
  do {
    const turnUp = deck.takeCard()

    if (turnUp && invalidTurnUpRanks.includes(turnUp?.rank)) {
      console.log(chalk.strikethrough(`${turnUp}`))
      validTurnUp = false
    } else {
      validTurnUp = true
      console.log(`${turnUp}`)
    }
  } while (!validTurnUp)
}
