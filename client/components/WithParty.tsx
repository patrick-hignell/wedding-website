// WithParty.tsx
import { useParams } from 'react-router'
import { useLoginGuests } from '../hooks/useLoginGuests'
import { useEffect, useState } from 'react'
import { LoginGuests } from '../../models/form'
import Rsvp from './Rsvp'

interface Props {
  component: React.ComponentType<{
    party: LoginGuests
  }>
}

export default function WithParty({ component: Component }: Props) {
  const params = useParams()
  const id = params.id
  const [party, setParty] = useState<LoginGuests>()

  const { byId: getLoginGuestsById } = useLoginGuests({ enabled: false })

  useEffect(() => {
    if (id) {
      getLoginGuestsById.mutate(id, {
        onSuccess: (data) => {
          if (!data) {
            window.location.href = '/'
          } else {
            setParty(data)
          }
        },
        onError: () => {
          window.location.href = '/'
        },
      })
    } else {
      window.location.href = '/'
    }
  }, [])

  if (!party) return null

  if (party.rsvpReceived == false) {
    return <Rsvp />
  }

  return <Component party={party} />
}
