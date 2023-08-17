// StreamersQuery.js (nouveau fichier)
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchStreamersSectionsPage } from '../queries/fetchAPI';

const QUERY_KEY_STREAMERS_SECTION = 'streamersSectionsPages';

const useStreamersSectionQuery = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY_STREAMERS_SECTION],
    queryFn: fetchStreamersSectionsPage,
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

export default useStreamersSectionQuery;
