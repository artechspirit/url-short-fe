export interface DemoResponse {
  message: string;
}

export interface UrlData {
  token: string;
  originalUrl: string;
  clickCount: number;
  createdAt: Date;
}

export interface ShortenUrlRequest {
  url: string;
}

export interface ShortenUrlResponse {
  success: boolean;
  token?: string;
  shortUrl?: string;
  error?: string;
}

export interface UrlStatsResponse {
  success: boolean;
  data?: UrlData;
  error?: string;
}
