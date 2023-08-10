import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteRule from '../utils/deleteRulesSection';

/**
 * Hook to create a function for deleting a rule section.
 * @returns {Function} Function to delete a rule section.
 */
export function useDeleteRule() {
  const queryClient = useQueryClient();

  /**
   * Function to delete a rule section.
   *
   * @param {Object} rulesSectionData - The data of the rule section to be deleted.
   */
  const deleteRuleMutation = useMutation(
    /**
     * Mutation function to delete a rule section.
     * @param {string} ruleId - The id of the rule section to be deleted.
     * @returns {Promise} A promise representing the fetch operation.
     */
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

  return (rulesSectionData) => {
    return deleteRule(deleteRuleMutation, rulesSectionData);
  };
}
