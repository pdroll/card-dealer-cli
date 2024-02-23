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

const shuffleAndCutDeck = async (
  deck: StandardDeck,
  opts: DealAHandOptions,
) => {
  if (opts.shuffleTimes) {
    console.log(
      chalk.italic(
        `\nShuffling the deck ${opts.shuffleTimes} time${opts.shuffleTimes > 1 ? 's' : ''}...\n`,
      ),
    )
    deck.riffleShuffle(opts.shuffleTimes, opts.perfectShuffle)
  }

  let cutTheDeck: boolean | undefined = opts.cut
  if (opts.cut === undefined) {
    const answer = await prompts({
      type: 'confirm',
      name: 'cutTheDeck',
      message: 'Do you want to cut the deck?',
    })

    cutTheDeck = answer.cutTheDeck
  }

  if (cutTheDeck) {
    deck.cut()
    console.log(chalk.italic(`Cutting the deck...\n`))
  }

  return deck
}

const dealBlackjack = async (opts: DealAHandOptions) => {
  const deck = new StandardDeck()

  await shuffleAndCutDeck(deck, opts)
  console.log('Deal Blackjack!', deck.showCards())
}

const dealPoker = async (opts: DealAHandOptions) => {
  const deck = new StandardDeck()
  await shuffleAndCutDeck(deck, opts)

  console.log('Deal Poker!', deck.showCards())
}

const dealEuchre = async (opts: DealAHandOptions) => {
  const deck = new EuchreDeck()
  await shuffleAndCutDeck(deck, opts)

  console.log('Deal Euchre!', deck.showCards())
}

const dealPinochle = async (opts: DealAHandOptions) => {
  const deck = new PinochleDeck()
  await shuffleAndCutDeck(deck, opts)

  console.log('Deal Pinochle!', deck.showCards())
}

const dealCanasta = async (opts: DealAHandOptions) => {
  const deck = new CanastaDeck()
  await shuffleAndCutDeck(deck, opts)

  console.log('Deal Canasta!', deck.showCards())
}
