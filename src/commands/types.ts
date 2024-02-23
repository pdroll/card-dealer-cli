import type { DeckTypeName } from '@lib/deck'

export interface GlobalOpts {
  perfectShuffle?: boolean
  shuffleTimes?: number
}

export interface PickACardOpts {
  deck: DeckTypeName
  count: number
  top: boolean
  cut?: boolean
}

export interface DealAHandOpts {}
