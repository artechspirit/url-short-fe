import {
  createShortUrl,
  getShortUrlStats,
  redirectToOriginalUrl,
} from "@/services/shorten-url.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateShortenerUrl = () => {
  return useMutation({
    mutationFn: createShortUrl,
  });
};

export const useUrlShortenerRedirect = (token: string) => {
  return useQuery({
    queryKey: ["short-url-redirect", token],
    queryFn: () => redirectToOriginalUrl(token),
    refetchOnWindowFocus: false,
  });
};

export const useGetShortUrlStats = (token: string) => {
  return useQuery({
    queryKey: ["short-url-stats", token],
    queryFn: () => getShortUrlStats(token),
  });
};
