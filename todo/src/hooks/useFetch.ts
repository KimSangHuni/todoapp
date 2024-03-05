import useSWR, { BareFetcher } from 'swr';

export function useNotionFetch(key:string, fetcher: BareFetcher<any>) {
    const { data, error, isLoading } = useSWR(key, fetcher, { suspense: true });

    return { data, error, isLoading };
}