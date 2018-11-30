import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();
export const API_ROOT = env.REACT_APP_EDM_STREAM_BACKEND_HOST || 'http://localhost:5001';
export const API_ROOT_STATS = env.REACT_APP_EDM_STATS_BACKEND_HOST || 'http://localhost:5002';
