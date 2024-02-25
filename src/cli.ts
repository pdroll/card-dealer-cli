#!/usr/bin/env node

import { Command, Option, program } from 'commander'
import type { DealAHandOpts, GlobalOpts, PickACardOpts } from '@commands/types'
import { dealAHandHandler } from '@commands/deal-a-hand'
import { deckTypeNames } from '@lib/deck'
import { gameTypes } from '@commands/types'
import { pickACardHandler } from '@commands/pick-a-card'

const pickACard = new Command('pick-a-card')
  .description('Pick a random card or cards from a deck')
  .addOption(
    new Option('-d, --deck <deck-type>', 'What type of deck should we use')
      .choices(deckTypeNames)
      .default(deckTypeNames[0]),
  )
  .addOption(
    new Option('-c, --count <number>', 'How many cards should be chosen?')
      .default(1)
      .argParser(parseFloat),
  )
  .option(
    '--top',
    'Should the card be pulled from the top of the deck, rather than at a random point in the deck?',
    false,
  )
  .action(async (options: PickACardOpts, command: Command) => {
    const opts = {
      ...command?.parent?.opts<GlobalOpts>(),
      ...options,
    }

    await pickACardHandler(opts)
    console.log('\n')
  })

const dealAHand = new Command('deal-a-hand')
  .description('Deal a hand for one of several types of card games')
  .addOption(
    new Option(
      '-g, --game <game-type>',
      'What card game should we deal a hand for?',
    ).choices(gameTypes),
  )
  .action(async (options: DealAHandOpts, command: Command) => {
    const opts = {
      ...command?.parent?.opts<GlobalOpts>(),
      ...options,
    }
    await dealAHandHandler(opts)

    console.log('\n')
  })

program
  .name('deck-of-cards')
  .addCommand(pickACard, { isDefault: true })
  .addCommand(dealAHand)
  .option(
    '-p, --perfect-shuffle',
    'Should all randomness be removed when shuffling the deck?',
    false,
  )
  .addOption(
    new Option(
      '-t, --shuffle-times <times>',
      'How many times should we shuffle the deck?',
    )
      .default(7)
      .argParser(parseFloat),
  )
  .addOption(
    new Option(
      '--cut [Y/n]',
      'Do you want to cut the deck after shuffling?',
    ).argParser((a) => (a === 'n' ? false : true)),
  )

program.parse()
