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
    queryKey: ['logins'],
    queryFn: () => API.getAllLogins(),
  })

  return {
    ...query,
    add: useAddLogin(),
    delete: useDeleteLogin(),
    // edit: useEditGuest(),
  }
}

export function useLoginMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logins'] })
      queryClient.invalidateQueries({ queryKey: ['guests'] })
    },
  })

  return mutation
}

export function useAddLogin() {
  return useLoginMutation(API.addLogin)
}

export function useDeleteLogin() {
  return useLoginMutation(API.deleteLogin)
}
