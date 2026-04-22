import constants from '../configs/constants';
import authService from './authService';
class UrlService {
    apiUrl;
    backendUrl;
    constructor() {
        this.apiUrl = constants.apiUrl;
        this.backendUrl = constants.backendUrl;
    }
    async createUrl(urlData) {
        const token = authService.getToken();
        const headers = {
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
    async getAllUrls() {
        const response = await fetch(`${this.apiUrl}/urls`);
        if (!response.ok) {
            throw new Error('Failed to fetch URLs');
        }
        return response.json();
    }
    async getMyUrls() {
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
    getShortUrl(shortId) {
        return `${this.backendUrl}/${shortId}`;
    }
}
const urlService = new UrlService();
export default urlService;
