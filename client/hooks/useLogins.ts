import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import * as API from '../apis/logins.ts'

export function useLogins() {
  // return useQuery({
  const query = useQuery({
    queryKey: ['guests'],
    queryFn: () => API.getAllLogins(),
  })

  return {
    ...query,
    add: useAddLogin(),
    // delete: useDeleteGuest(),
    // edit: useEditGuest(),
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

export function useAddLogin() {
  return useGuestMutation(API.addLogin)
}
