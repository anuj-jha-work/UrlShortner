import constants from '../configs/constants';
class AuthService {
    apiUrl;
    constructor() {
        this.apiUrl = constants.apiUrl;
    }
    // Store token in localStorage
    setToken(token) {
        localStorage.setItem('authToken', token);
    }
    // Get token from localStorage
    getToken() {
        return localStorage.getItem('authToken');
    }
    // Remove token from localStorage
    removeToken() {
        localStorage.removeItem('authToken');
    }
    // Check if user is authenticated
    isAuthenticated() {
        return !!this.getToken();
    }
    // Register new user
    async register(data) {
        const response = await fetch(`${this.apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Registration failed');
        }
        const result = await response.json();
        this.setToken(result.data.token);
        return result;
    }
    // Login user
    async login(data) {
        const response = await fetch(`${this.apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }
        const result = await response.json();
        this.setToken(result.data.token);
        return result;
    }
    // Get current user
    async getCurrentUser() {
        const token = this.getToken();
        if (!token) {
            throw new Error('Not authenticated');
        }
        const response = await fetch(`${this.apiUrl}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            if (response.status === 401) {
                this.removeToken();
            }
            throw new Error('Failed to get user data');
        }
        return response.json();
    }
    // Logout user
    logout() {
        this.removeToken();
    }
}
const authService = new AuthService();
export default authService;
