// rulesQuery.js (nouveau fichier)
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRulesSectionsPage } from '../queries/fetchAPI';

const QUERY_KEY_RULES_SECTION = ['rulesSectionsPages'];

const useRulesSectionQuery = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: QUERY_KEY_RULES_SECTION,
    queryFn: fetchRulesSectionsPage,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === 0 ? false : pages.length,
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};

export default useRulesSectionQuery;
