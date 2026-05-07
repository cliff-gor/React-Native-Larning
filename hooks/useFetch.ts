import { useEffect, useState, useCallback } from "react";

export default function useFetch<T>(url: string, options: { page?: number; limit?: number } = {}) {
  const [data, setData] = useState<T[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(options.page || 1);

  const fetchData = useCallback(async (page: number) => {
    let isMounted = true;

    try {
      setIsLoading(true);

      const response = await fetch(`${url}?_page=${page}&_limit=${options.limit || 10}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result: T[] = await response.json();

      if (isMounted) {
        setData(prevData => {
          if (page === 1) {
            return result;
          }
          return [...(prevData || []), ...result] as T[];
        });
        setHasMore(result.length > 0);
        setCurrentPage(page);
        setIsLoading(false);
      }
    } catch (err: any) {
      if (isMounted) {
        setError(err.message || "Something went wrong");
        setIsLoading(false);
      }
    }
  }, [url, options.limit]);

  useEffect(() => {
    fetchData(1);
  }, [url, options.limit, fetchData]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = Math.floor((data?.length || 0) / (options.limit || 10)) + 1;
      fetchData(nextPage);
    }
  }, [data, isLoading, hasMore, options.limit, fetchData]);

  return { data, isLoading, error, hasMore, loadMore, currentPage };
}