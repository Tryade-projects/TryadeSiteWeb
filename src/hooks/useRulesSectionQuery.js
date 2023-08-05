// rulesQuery.js (nouveau fichier)
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRulesSections } from '../queries/fetchAPI';

const QUERY_KEY_RULES_SECTION = ['rules_section'];

const useRulesSectionQuery = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: QUERY_KEY_RULES_SECTION,
    queryFn: fetchRulesSections,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === 0 ? false : pages.length,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};

export default useRulesSectionQuery;
