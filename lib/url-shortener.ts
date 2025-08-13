import { UrlData, ShortenUrlResponse, UrlStatsResponse } from "../types";

// Mock database - in real app this would be in a database
const mockDatabase: Map<string, UrlData> = new Map();

// Generate random token for short URL
export const generateToken = (): string => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < 8; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

// Validate URL format
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock URL shortening service
export const shortenUrl = async (
  originalUrl: string
): Promise<ShortenUrlResponse> => {
  // Simulate API delay
  await delay(1000 + Math.random() * 1000);

  // Validate URL
  if (!isValidUrl(originalUrl)) {
    return {
      success: false,
      error: "Please enter a valid URL",
    };
  }

  // Generate unique token
  let token = generateToken();
  while (mockDatabase.has(token)) {
    token = generateToken();
  }

  // Create URL data
  const urlData: UrlData = {
    token,
    originalUrl,
    clickCount: 0,
    createdAt: new Date(),
  };

  // Store in mock database
  mockDatabase.set(token, urlData);

  // Return response
  return {
    success: true,
    token,
    shortUrl: `https://short.ly/${token}`,
  };
};

// Mock URL statistics service
export const getUrlStats = async (token: string): Promise<UrlStatsResponse> => {
  // Simulate API delay
  await delay(500 + Math.random() * 500);

  const urlData = mockDatabase.get(token);

  if (!urlData) {
    return {
      success: false,
      error: "Short URL not found",
    };
  }

  // Simulate random click count increases for demo
  if (Math.random() > 0.7) {
    urlData.clickCount += Math.floor(Math.random() * 3) + 1;
  }

  return {
    success: true,
    data: urlData,
  };
};

// Add some sample data for demo
const initializeSampleData = () => {
  const sampleUrls = [
    "https://www.google.com",
    "https://github.com",
    "https://stackoverflow.com",
  ];

  sampleUrls.forEach((url, index) => {
    const token = ["demo123", "test456", "sample789"][index];
    mockDatabase.set(token, {
      token,
      originalUrl: url,
      clickCount: Math.floor(Math.random() * 100) + 10,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    });
  });
};

// Initialize sample data
initializeSampleData();
