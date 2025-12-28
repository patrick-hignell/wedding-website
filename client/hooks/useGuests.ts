import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import * as API from '../apis/guests.ts'

export function useGuests() {
  // return useQuery({
  const query = useQuery({
    queryKey: ['guests'],
    queryFn: () => API.getAllGuests(),
  })

  return {
    ...query,
    add: useAddGuests(),
    delete: useDeleteGuest(),
    edit: useEditGuest(),
  }
}

export function useGuestMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] })
    },
  })

  return mutation
}

export function useAddGuests() {
  return useGuestMutation(API.addGuests)
}

export function useDeleteGuest() {
  return useGuestMutation(API.deleteGuest)
}

export function useEditGuest() {
  return useGuestMutation(API.editGuest)
}
