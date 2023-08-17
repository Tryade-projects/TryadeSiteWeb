import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUpdatesSectionsPage } from '../queries/fetchAPI';

const QUERY_KEY_UPDATES_SECTION = 'updatesSectionsPages';

const useUpdatesSectionQuery = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY_UPDATES_SECTION],
    queryFn: fetchUpdatesSectionsPage,
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

export default useUpdatesSectionQuery;
