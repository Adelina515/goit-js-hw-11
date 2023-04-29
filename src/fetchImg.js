//  const BASE_URL = "https://restcountries.com/v3.1";
// export function fetchCountries(name) {
//     return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
//         .then((response) => {
//             if (!response.ok) {
// 			throw new Error(response.status);
// 		}
// 		return response.json()
//         })        
// }

import axios from "axios";
const API_KEY = "35888485-ef78d2b3836896c1b6f2f0b14";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImg(query, page, perPage) {
    try {
     const dataPhoto = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
         .then((response) => {
             if (!response.ok) {
                throw new Error(response.status);
             }
                console.log(response)
            });
        return;
        
    } catch (err) {
         Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        refs.gallery.innerHTML = '';
        
    }
}