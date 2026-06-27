import { EMERGENCY } from '../content/contacts'
import PhoneLink from './PhoneLink'

export default function EmergencyBar() {
  return (
    <div className="calls">
      {EMERGENCY.map((c) => (
        <PhoneLink key={c.tel} contact={c} />
      ))}
    </div>
  )
}
