const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
export const API_BASE_URL = apiUrl ?? 'http://localhost:3000'
// 'https://api.example.com';
export const JOKE_ENDPOINT = '/api/joke';
// `${API_BASE_URL}${JOKE_ENDPOINT}/${jokeId}`