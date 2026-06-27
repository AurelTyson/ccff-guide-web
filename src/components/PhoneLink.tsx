import type { Contact } from '../content/contacts'

export default function PhoneLink({ contact }: { contact: Contact }) {
  return (
    <a
      className={`call${contact.urgent ? ' call--urgent' : ''}`}
      href={`tel:${contact.tel}`}
    >
      <span className="call__num">{contact.display}</span>
      <span className="call__body">
        <span className="call__label">{contact.label}</span>
        {contact.note && <span className="call__note">{contact.note}</span>}
      </span>
      <span className="call__go" aria-hidden>
        ›
      </span>
    </a>
  )
}
