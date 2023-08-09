import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteRuleMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (ruleId) => {
      return fetch(`http://localhost:5000/rulesSections/${ruleId}`, {
        method: 'DELETE',
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['rulesSections']);
      },
    }
  );
}
