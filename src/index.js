import './css/styles.css';
import { fetchImg } from "./fetchImg.js";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"; 



const refs = {
    form: document.getElementById("search-form"),
    gallery: document.querySelector(".gallery"),
    loadMore: document.querySelector(".load-more"),
}

refs.form.addEventListener('submit', handleSubmit);
refs.loadMore.addEventListener('click', handleLoadMore);

    const lightbox = new SimpleLightbox('.gallery .photo-card__link', {
        captions: true,
        captionsData: "alt",
        captionPosition: "bottom",
        captionDelay: 250,
});
 

async function handleLoadMore() {
    refs.loadMore.disabled = true;
    refs.loadMore.classList.add('visually-hidden')
    try {
        const inputValue = refs.form.value;
        const pageAdd = inctementPage();
        const { data } = await fetchImg(inputValue, pageAdd, 40); 
        Notify.success(`Hooray! We found ${data.totalHits} imades.`);
        renderMarkup(data.hits)
          if (data.totalHits < 1) {
            Notify.warning("We're sorry, but you've reached the end of search results.")
            refs.loadMore.disabled = false;
        }else if (data.totalHits < 40) {
            refs.loadMore.disabled = false;
        }
        refs.loadMore.disabled = false;
        refs.loadMore.classList.remove('visually-hidden');
        return;
    } catch (err){
        console.log(err)
    }   
}
function inctementPage(page) {
    page += 1;
}
async function handleSubmit(ev) {
    ev.preventDefault();
    refs.gallery.innerHTML = '';
    const inputValue = ev.currentTarget.searchQuery.value;
    try {
        const { data } = await fetchImg(inputValue, 1, 40); 
        if (data.hits.length === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
             refs.gallery.innerHTML = '';
        } else if (inputValue === ''){
            Notify.failure("Please input  query.");
            refs.gallery.innerHTML = '';
        } 
            Notify.success(`Hooray! We found ${data.totalHits} imades.`);
            renderMarkup(data.hits);
            lightbox.refresh();

         if (data.totalHits < 40) {
            refs.loadMore.disabled = false;
        }
            refs.loadMore.classList.remove('visually-hidden')
            refs.loadMore.disabled = false;
        
        console.log(data)
    }
    catch (err) {
      console.log(err)
    }   
}

 
function renderMarkup(data) {
    const markup = createGalleryHits(data);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    return;
}

function createGalleryHits(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                    <a class="photo-card__link" href="${largeImageURL}"> <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>${downloads}
                         </p>
                    </div>
                </div>`;
      }
    )
    .join('');
}


 


