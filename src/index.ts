import { program, Option, Command } from 'commander'
import { type DeckTypeName, deckTypeNames, DeckClassMap } from '@lib/deck'
import chalk from 'chalk'
import prompts from 'prompts'
import times from 'lodash/times'
import { Card } from '@lib/card'

interface GlobalOpts {
  perfectShuffle: boolean
  shuffleTimes: number
}

interface PickACardOpts {
  deck: DeckTypeName
  count: number
  top: boolean
  cut?: boolean
}

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
    console.log(cards.map((c) => c.toString()).join(' '))
    console.log('\n')
  })

interface DealAHandOpts {}

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
