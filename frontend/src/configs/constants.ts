const env = import.meta.env;

const backendUrl = String(env.VITE_BACKEND_URL || 'http://localhost:3000');

const constants = {
    backendUrl: backendUrl,
    apiUrl: `${backendUrl}/api`,
}

export default constants;
