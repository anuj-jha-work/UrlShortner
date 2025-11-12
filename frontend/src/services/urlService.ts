import constants from '../configs/constants';
import authService from './authService';

export interface UrlData {
  originalUrl: string;
  expiresAt: number; // in seconds
}

export interface UrlResponse {
  shortId: string;
}

export interface UrlItem {
  _id: string;
  originalUrl: string;
  shortId: string;
  clicks: number;
  createdAt: string;
  expiresAt: string;
  userId?: string;
}

export interface UrlsResponse {
  urls: UrlItem[];
}

class UrlService {
  private apiUrl: string;
  private backendUrl: string;

  constructor() {
    this.apiUrl = constants.apiUrl;
    this.backendUrl = constants.backendUrl;
  }

  async createUrl(urlData: UrlData): Promise<UrlResponse> {
    const token = authService.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.apiUrl}/create`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        Url: {
          originalUrl: urlData.originalUrl,
          expiresAt: urlData.expiresAt,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create short URL');
    }

    return response.json();
  }

  async getAllUrls(): Promise<UrlsResponse> {
    const response = await fetch(`${this.apiUrl}/urls`);

    if (!response.ok) {
      throw new Error('Failed to fetch URLs');
    }

    return response.json();
  }

  async getMyUrls(): Promise<UrlsResponse> {
    const token = authService.getToken();

    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${this.apiUrl}/my-urls`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch URLs');
    }

    return response.json();
  }

  getShortUrl(shortId: string): string {
    return `${this.backendUrl}/${shortId}`;
  }
}

const urlService = new UrlService();

export default urlService;
