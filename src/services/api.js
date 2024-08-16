import axios from "axios";

// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API: movie/now_playing?api_key=dfa4fc8f554de20cd7318a5f3ae7a20c&language=pr-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;