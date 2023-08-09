export default function deleteRule(mutation, rulesSectionData) {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette section ?')) {
      mutation.mutate(rulesSectionData._id);
    }
  };
}
