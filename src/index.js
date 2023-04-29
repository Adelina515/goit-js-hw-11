import './css/styles.css';
import { fetchImg } from "./fetchImg.js";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';


const refs = {
    form: document.getElementById("search-form"),
    gallery: document.querySelector(".gallery"),
}

refs.form.addEventListener('submit', handleSubmit);
function handleSubmit(ev) {
    ev.preventDefault;
    const inputValue = ev.currentTarget.searchQuery.value;
    fetchImg(inputValue)
}
 


 



