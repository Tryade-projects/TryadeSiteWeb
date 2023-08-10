import { useMutation, useQueryClient } from '@tanstack/react-query';
import postOrUpdateRulesSection from '../utils/postOrUpdateRulesSection';

/**
 * Hook to post or update a rules section.
 * @returns {Function} Function to post or update a rules section.
 */
export function usePostOrUpdateRulesSection() {
  const queryClient = useQueryClient();

  const postOrUpdateRulesSectionMutation = useMutation(
    /**
     * Mutation function to post or update a rules section.
     * @param {Object} newData - The new data for the rules section.
     * @param {string=} newData._id - The id of the rules section.
     * @param {boolean=} newData.newSection - Indicates whether it's a new section.
     * @param {string} newData.sectionTitle - The title of the rules section.
     * @param {string} newData.urlBanner - The url of the banner of the rules section.
     * @param {Array} newData.rules - List of rules.
     * @returns {Promise} A promise representing the fetch operation.
     */
    (newData) => {
      console.log(JSON.stringify(newData));

      if (newData.newSection) {
        const newDataForPost = { ...newData };
        delete newDataForPost._id;
        delete newDataForPost.newSection;
        newDataForPost.rules = newDataForPost.rules.map((rule) => {
          const { _id, ...rest } = rule;
          return rest;
        });
        return fetch(`http://localhost:5000/rulesSections`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDataForPost),
        });
      } else {
        return fetch(`http://localhost:5000/rulesSections/${newData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['rulesSections']);
      },
    }
  );

  /**
   * Function to post or update a rules section.
   * @param {Object} newData - The new data for the rules section.
   */
  return (newData) => {
    return postOrUpdateRulesSection(postOrUpdateRulesSectionMutation, newData);
  };
}
