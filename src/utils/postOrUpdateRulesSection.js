/**
 * postOrUpdateRulesSection - Function to handle posting or updating rules section data.
 *
 * @param {Object} mutation - The mutation function from React Query.
 * @param {Object} newData - The new data for the rules section.
 */
export default function postOrUpdateRulesSection(mutation, newData) {
  /**
   * Handle form submission to post or update rules section data.
   *
   * @param {Event} e - The form submission event.
   */
  return (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm('Sauvegarder les modifications ?')) {
      mutation.mutate(newData);
    }
  };
}
