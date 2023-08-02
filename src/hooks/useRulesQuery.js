// rulesQuery.js (nouveau fichier)
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRulesSections } from '../queries/fetchAPI';

const QUERY_RULES = ['rules'];

const useRulesQuery = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: QUERY_RULES,
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

export default useRulesQuery;
