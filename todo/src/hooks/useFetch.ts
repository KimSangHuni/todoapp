import useSWR, { BareFetcher } from 'swr';

export function useFetch(key:string, fetcher: BareFetcher<any>) {
    const { data, error, isLoading } = useSWR(key, fetcher);

    return { data, error, isLoading };
}