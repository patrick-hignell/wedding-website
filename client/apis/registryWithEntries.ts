import request from 'superagent'
import { RegistryWithEntries } from '../../models/registry'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllRegistryWithEntries(): Promise<
  RegistryWithEntries[]
> {
  const response = await request.get(
    `${rootURL}/registry/registry-with-entries`,
  )
  return response.body as RegistryWithEntries[]
}
