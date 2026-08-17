import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import * as API from '../apis/registryEntry.ts'

export function useRegistryEntry() {
  // return useQuery({
  const query = useQuery({
    queryKey: ['registryEntry'],
    queryFn: () => API.getAllRegistryEntries(),
  })

  return {
    ...query,
    add: useAddRegistryEntry(),
    delete: useDeleteRegistryEntry(),
    edit: useEditRegistryEntry(),
  }
}

export function useRegistryEntryMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registryEntry'] })
    },
  })

  return mutation
}

export function useAddRegistryEntry() {
  return useRegistryEntryMutation(API.addRegistryEntry)
}

export function useDeleteRegistryEntry() {
  return useRegistryEntryMutation(API.deleteRegistryEntry)
}

export function useEditRegistryEntry() {
  return useRegistryEntryMutation(API.editRegistryEntry)
}
