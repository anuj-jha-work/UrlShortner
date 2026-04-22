import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
// Export everything from hooks
export * from './hooks';
// Export actions
export * from './slices/authSlice';
