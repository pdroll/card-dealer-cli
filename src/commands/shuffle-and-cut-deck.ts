import chalk from 'chalk'
import prompts from 'prompts'

import { StandardDeck } from '../lib/deck'
import { type GlobalOpts } from './types'

export const shuffleAndCutDeck = async <D extends StandardDeck>(
  deck: D,
  opts: GlobalOpts,
): Promise<D> => {
  if (opts.shuffleTimes) {
    console.log(
      chalk.italic(
        `Shuffling the deck ${opts.shuffleTimes} time${opts.shuffleTimes > 1 ? 's' : ''}...\n`,
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
