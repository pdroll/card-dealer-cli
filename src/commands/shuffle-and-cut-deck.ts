import chalk from 'chalk'
import prompts from 'prompts'

import { StandardDeck } from '../lib/deck'
import { type GlobalOpts } from './types'

const shouldCutDeck = async (opts: GlobalOpts) => {
  let cutTheDeck: boolean | undefined = opts.cut
  if (opts.cut === undefined) {
    const answer = await prompts({
      type: 'confirm',
      name: 'cutTheDeck',
      message: 'Do you want to cut the deck?',
    })

    cutTheDeck = answer.cutTheDeck
  }

  return !!cutTheDeck
}

const logShuffling = (times: number) => {
  console.log(
    chalk.italic(
      `Shuffling the deck ${times} time${times > 1 ? 's' : ''}...\n`,
    ),
  )
}

export const shuffleAndCutDeck = async <D extends StandardDeck>(
  deck: D,
  opts: GlobalOpts,
): Promise<D> => {
  if (opts.shuffleTimes) {
    logShuffling(opts.shuffleTimes)
    deck.riffleShuffle(opts.shuffleTimes, opts.perfectShuffle)
  }

  if (await shouldCutDeck(opts)) {
    deck.cut()
    console.log(chalk.italic(`Cutting the deck...\n`))
  }

  return deck
}

export const shuffleAndCutDecks = async <D extends StandardDeck[]>(
  decks: D,
  opts: GlobalOpts,
): Promise<D> => {
  if (opts.shuffleTimes) {
    logShuffling(opts.shuffleTimes)
    decks.forEach((deck) =>
      deck.riffleShuffle(opts.shuffleTimes, opts.perfectShuffle),
    )
  }

  if (await shouldCutDeck(opts)) {
    console.log(chalk.italic(`Cutting the deck...\n`))
    decks.forEach((deck) => deck.cut())
  }

  return decks
}
