import { useDeleteRuleMutation } from '../queries/fetchDeleteRule';
import deleteRule from '../utils/deleteRule';

export function useDeleteRule() {
  const deleteRuleMutation = useDeleteRuleMutation();

  return (rulesSectionData) => {
    return deleteRule(deleteRuleMutation, rulesSectionData);
  };
}
