import { numberToLetter } from './utils'

describe(numberToLetter, () => {
  it('converts integers to letters of the alphabet', () => {
    expect(numberToLetter(1)).toBe('A')
    expect(numberToLetter(2)).toBe('B')
    expect(numberToLetter(3)).toBe('C')
    expect(numberToLetter(26)).toBe('Z')
  })
})
