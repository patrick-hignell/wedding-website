import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import * as API from '../apis/registry.ts'

export function useRegistry() {
  // return useQuery({
  const query = useQuery({
    queryKey: ['registry'],
    queryFn: () => API.getAllRegistry(),
  })

  return {
    ...query,
    add: useAddRegistry(),
    delete: useDeleteRegistry(),
    edit: useEditRegistry(),
  }
}

export function useRegistryMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registry'] })
    },
  })

  return mutation
}

export function useAddRegistry() {
  return useRegistryMutation(API.addRegistry)
}

export function useDeleteRegistry() {
  return useRegistryMutation(API.deleteRegistry)
}

export function useEditRegistry() {
  return useRegistryMutation(API.editRegistry)
}
