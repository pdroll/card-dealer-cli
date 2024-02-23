import { program, Option, Command } from 'commander'
import { deckTypeNames } from '@lib/deck'
import { pickACardHandler } from '@commands/pick-a-card'
import type { GlobalOpts, PickACardOpts, DealAHandOpts } from '@commands/types'

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
  .addOption(
    new Option(
      '--cut [Y/n]',
      'Do you want to cut the deck after shuffling?',
    ).argParser((a) => (a === 'n' ? false : true)),
  )
  .action(async (options: PickACardOpts, command: Command) => {
    const opts = {
      ...command?.parent?.opts<GlobalOpts>(),
      ...options,
    }

    await pickACardHandler(opts)
  })

const dealAHand = new Command('deal-a-hand')
  .description('Deal a hand for one of several types of card games')
  .action((options: DealAHandOpts, command: Command) => {
    const opts = {
      ...command?.parent?.opts<GlobalOpts>(),
      ...options,
    }

    console.log('Dealing a hand', opts)
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

program.parse()
