import { ALPHABET } from '../content/alphabet'

export default function AlphabetPhonetique() {
  return (
    <div className="page">
      <p className="lead">
        Pour épeler clairement un mot, un nom ou une immatriculation à la radio.
      </p>
      <div className="alpha">
        {ALPHABET.map((a) => (
          <div key={a.letter} className="alpha__item">
            <span className="alpha__letter">{a.letter}</span>
            <span className="alpha__word">{a.word}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
