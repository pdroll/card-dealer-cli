import chalk from 'chalk'
import capitalize from 'lodash/capitalize'
import prompts from 'prompts'

import { BlackjackDealer } from '../dealers/blackjack-dealer'
import { CanastaDealer } from '../dealers/canasta-dealer'
import { EuchreDealer } from '../dealers/euchre-dealer'
import { GinDealer } from '../dealers/gin-dealer'
import { PinochleDealer } from '../dealers/pinochle-dealer'
import { PokerDealer } from '../dealers/poker-dealer'
import {
  CanastaDeck,
  EuchreDeck,
  PinochleDeck,
  StandardDeck,
} from '../lib/deck'
import { numberToLetter } from '../lib/utils'
import { shuffleAndCutDeck } from './shuffle-and-cut-deck'
import {
  type DealAHandOpts,
  GameType,
  gameTypes,
  type GlobalOpts,
} from './types'

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
    case 'gin':
      return dealGin(opts)
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
  console.log(chalk.bold.underline('\nDealing Blackjack\n'))
  const deck = await shuffleAndCutDeck(new StandardDeck(), opts)
  const blackjackDealer = new BlackjackDealer(deck)
  const { playerHands, dealerHand } = blackjackDealer.deal(
    await promptPlayers(),
  )

  const hands = [...playerHands, dealerHand]
  hands.map((hand) => {
    console.log(chalk.bold.underline(`\n${hand.name}`))
    console.log(hand.showCards())
  })
}

const dealPoker = async (opts: DealAHandOptions) => {
  console.log(chalk.bold.underline("\nDealing Texas Hold'em poker\n"))
  const deck = await shuffleAndCutDeck(new StandardDeck(), opts)
  const dealer = new PokerDealer(deck)
  const { playerHands, boardCards } = dealer.deal(await promptPlayers())

  playerHands.map((hand) => {
    console.log(`\n${chalk.bold.underline(hand.name)}`)
    console.log(hand.showCards())
  })

  console.log(chalk.italic.underline('\nBoard'))
  console.log(boardCards.join('  '))
}

const dealEuchre = async (opts: DealAHandOptions) => {
  console.log(chalk.bold.underline('\nDealing Euchre\n'))
  const deck = await shuffleAndCutDeck(new EuchreDeck(), opts)
  const dealer = new EuchreDealer(deck)
  const { teams, turnUp } = dealer.deal()

  teams.map((hands, ix) => {
    console.log(chalk.bold.underline(`\nTeam ${numberToLetter(ix + 1)}`))
    hands.map((hand) => console.log(`${hand.name}:  ${hand.showCards()}`))
  })

  console.log(chalk.underline(`\nTurn Up`))
  console.log(`${turnUp}`)
}

const dealPinochle = async (opts: DealAHandOptions) => {
  console.log(chalk.bold.underline('\nDealing Pinochle\n'))
  const deck = await shuffleAndCutDeck(new PinochleDeck(), opts)
  const dealer = new PinochleDealer(deck)
  const { playerHands, turnUp } = dealer.deal()

  playerHands.map((hand) => {
    console.log(`\n${chalk.bold.underline(hand.name)}`)
    console.log(hand.showCards())
  })

  console.log(chalk.underline(`\nTurn Up`))
  console.log(`${turnUp}`)
}

const dealCanasta = async (opts: DealAHandOptions) => {
  console.log(chalk.bold.underline('\nDealing Canasta\n'))
  const deck = await shuffleAndCutDeck(new CanastaDeck(), opts)
  const dealer = new CanastaDealer(deck)
  const { teams, turnUp } = dealer.deal()

  teams.map((hands, ix) => {
    console.log(chalk.bold.underline(`\nTeam ${numberToLetter(ix + 1)}`))
    hands.map((hand) => console.log(`${hand.name}:  ${hand.showCards()}`))
  })

  console.log(chalk.underline(`\nTurn Up`))
  console.log(`${turnUp}`)
}

const dealGin = async (opts: DealAHandOptions) => {
  console.log(chalk.bold.underline('\nDealing Gin Rummy\n'))
  const deck = await shuffleAndCutDeck(new StandardDeck(), opts)
  const dealer = new GinDealer(deck)
  const { playerHands, turnUp } = dealer.deal()

  playerHands.map((hand) => {
    console.log(`\n${chalk.bold.underline(hand.name)}`)
    console.log(hand.showCards())
  })

  console.log(chalk.underline(`\nTurn Up`))
  console.log(`${turnUp}`)
}
