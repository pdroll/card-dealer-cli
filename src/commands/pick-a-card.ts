import { DeckClassMap } from '@lib/deck'
import chalk from 'chalk'
import prompts from 'prompts'
import times from 'lodash/times'
import { Card } from '@lib/card'
import type { GlobalOpts, PickACardOpts } from '@commands/types'
import { shuffleAndCutDeck } from '@commands/shuffle-and-cut-deck'

interface PickACardOptions extends PickACardOpts, GlobalOpts {}

export const pickACardHandler = async (opts: PickACardOptions) => {
  console.log(chalk.bold(`\nPicking a Card\n`))

  const deck = await shuffleAndCutDeck(new DeckClassMap[opts.deck](), opts)

  const cards: Card[] = []
  times(opts.count, () => {
    const card = opts.top ? deck.takeCard() : deck.takeRandomCard()
    if (card) cards.push(card)
  })

  console.log('\n')
  console.log(cards.map((c) => c.toString()).join('  '))
}
