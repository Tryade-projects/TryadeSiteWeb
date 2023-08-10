/**
 * deleteRule - Function to handle deleting a rule section.
 *
 * @param {Object} mutation - The mutation function from React Query.
 * @param {Object} rulesSectionData - The data of the rule section to be deleted.
 */
export default function deleteRule(mutation, rulesSectionData) {
  /**
   * Handle form submission to delete a rule section.
   *
   * @param {Event} e - The form submission event.
   */
  return (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette section ?')) {
      mutation.mutate(rulesSectionData._id);
    }
  };
}
