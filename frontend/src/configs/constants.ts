const env = import.meta.env;

const constants = {
    backendUrl: String(env.VITE_BACKEND_URL || 'http://localhost:3000'),
    apiUrl: String(env.VITE_API_URL || 'http://localhost:3000/api'),
}

export default constants;
