export interface PhoneticLetter {
  letter: string
  word: string
}

/** Alphabet international phonétique (version FR du guide). */
export const ALPHABET: PhoneticLetter[] = [
  { letter: 'A', word: 'Alpha' },
  { letter: 'B', word: 'Bravo' },
  { letter: 'C', word: 'Charlie' },
  { letter: 'D', word: 'Delta' },
  { letter: 'E', word: 'Echo' },
  { letter: 'F', word: 'Foxtrot' },
  { letter: 'G', word: 'Golf' },
  { letter: 'H', word: 'Hotel' },
  { letter: 'I', word: 'India' },
  { letter: 'J', word: 'Juliette' },
  { letter: 'K', word: 'Kilo' },
  { letter: 'L', word: 'Lima' },
  { letter: 'M', word: 'Mike' },
  { letter: 'N', word: 'November' },
  { letter: 'O', word: 'Oscar' },
  { letter: 'P', word: 'Papa' },
  { letter: 'Q', word: 'Québec' },
  { letter: 'R', word: 'Roméo' },
  { letter: 'S', word: 'Sierra' },
  { letter: 'T', word: 'Tango' },
  { letter: 'U', word: 'Uniforme' },
  { letter: 'V', word: 'Victor' },
  { letter: 'W', word: 'Whisky' },
  { letter: 'X', word: 'Xray' },
  { letter: 'Y', word: 'Yankee' },
  { letter: 'Z', word: 'Zoulou' },
]
