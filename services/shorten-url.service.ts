import { api } from "@/lib/api";

export const createShortUrl = async (url: string) => {
  const response = await api.post("/shorten", { originalUrl: url });
  return response.data;
};

export const redirectToOriginalUrl = async (token: string) => {
  const response = await api.get(`/${token}`);
  return response.data;
};

export const getShortUrlStats = async (token: string) => {
  const response = await api.get(`/stats/${token}`);
  return response.data;
};
