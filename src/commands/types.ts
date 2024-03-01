import type { DeckTypeName } from '../lib/deck'

export interface GlobalOpts {
  perfectShuffle?: boolean
  shuffleTimes?: number
  cut?: boolean
}

export interface PickACardOpts {
  deck: DeckTypeName
  count: number
  top: boolean
}

export const gameTypes = [
  'blackjack',
  'poker',
  'euchre',
  'pinochle',
  'canasta',
  'gin',
  'rummy',
] as const
export type GameType = (typeof gameTypes)[number]

export interface DealAHandOpts {
  game?: GameType
}
