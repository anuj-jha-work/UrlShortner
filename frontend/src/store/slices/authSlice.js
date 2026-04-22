import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services';
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
};
// Async thunks
export const initializeAuth = createAsyncThunk('auth/initialize', async (_, { rejectWithValue }) => {
    try {
        const token = authService.getToken();
        if (!token) {
            return null;
        }
        const response = await authService.getCurrentUser();
        return response.data;
    }
    catch (error) {
        authService.removeToken();
        return rejectWithValue('Failed to initialize auth');
    }
});
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await authService.login(credentials);
        return response.data.user;
    }
    catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
});
export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await authService.register(userData);
        return response.data.user;
    }
    catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
});
export const logoutUser = createAsyncThunk('auth/logout', async () => {
    authService.logout();
});
// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Initialize Auth
        builder
            .addCase(initializeAuth.pending, (state) => {
            state.loading = true;
        })
            .addCase(initializeAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.error = null;
        })
            .addCase(initializeAuth.rejected, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        });
        // Login
        builder
            .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        })
            .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // Register
        builder
            .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        })
            .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // Logout
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        });
    },
});
export const { clearError } = authSlice.actions;
export default authSlice.reducer;
