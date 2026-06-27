import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ALPHABET, DIGITS } from '../content/alphabet'

const LETTER_TO_WORD = new Map(ALPHABET.map((a) => [a.letter, a.word]))
const COMBINING_MARKS = /[̀-ͯ]/g

interface Spelled {
  char: string
  word: string
}

function spell(input: string): Spelled[] {
  // Strip accents, then map each character.
  const cleaned = input.normalize('NFD').replace(COMBINING_MARKS, '').toUpperCase()

  return [...cleaned].map((ch) => {
    if (ch >= 'A' && ch <= 'Z') return { char: ch, word: LETTER_TO_WORD.get(ch)! }
    if (ch >= '0' && ch <= '9') return { char: ch, word: DIGITS[Number(ch)] }
    if (ch === ' ') return { char: '␣', word: 'espace' }
    return { char: ch, word: ch }
  })
}

export default function Epeleur() {
  const [params] = useSearchParams()
  const [text, setText] = useState(() => params.get('q') ?? '')
  const result = useMemo(() => spell(text), [text])

  return (
    <div className="page">
      <p className="lead">
        Tapez un mot, un nom ou une immatriculation : obtenez son épellation
        phonétique à dicter à la radio.
      </p>

      <div className="search__field">
        <span aria-hidden>🔤</span>
        <input
          className="search__input"
          type="text"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Ex. : AB-123-CD"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          aria-label="Texte à épeler"
        />
      </div>

      {result.length === 0 ? (
        <p className="empty">L’épellation s’affiche ici au fur et à mesure.</p>
      ) : (
        <div className="alpha">
          {result.map((r, i) => (
            <div key={i} className="alpha__item">
              <span className="alpha__letter">{r.char}</span>
              <span className="alpha__word">{r.word}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
