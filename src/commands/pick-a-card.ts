import { DeckClassMap } from '@lib/deck'
import chalk from 'chalk'
import prompts from 'prompts'
import times from 'lodash/times'
import { Card } from '@lib/card'
import type { GlobalOpts, PickACardOpts } from '@commands/types'

interface PickACardOptions extends PickACardOpts, GlobalOpts {}

export const pickACardHandler = async (opts: PickACardOptions) => {
  console.log(chalk.bold(`\nPicking a Card\n`))

  const deck = new DeckClassMap[opts.deck]()

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
    console.log(chalk.italic(`\nCutting the deck...`))
  }

  const cards: Card[] = []
  times(opts.count, () => {
    const card = opts.top ? deck.takeCard() : deck.takeRandomCard()
    if (card) cards.push(card)
  })

  console.log('\n')
  console.log(cards.map((c) => c.toString()).join('  '))
  console.log('\n')
}
