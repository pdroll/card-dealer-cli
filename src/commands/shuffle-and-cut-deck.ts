import { type GlobalOpts } from '@commands/types'
import { StandardDeck } from '@lib/deck'
import chalk from 'chalk'
import prompts from 'prompts'

export const shuffleAndCutDeck = async (
  deck: StandardDeck,
  opts: GlobalOpts,
) => {
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
