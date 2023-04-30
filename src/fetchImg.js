
import axios from "axios";
const API_KEY = "35888485-ef78d2b3836896c1b6f2f0b14";
const BASE_URL = "https://pixabay.com/api/";



export async function fetchImg(query, page, perPage) {
    return await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
}


function resetPage() {
    page = 1;
}