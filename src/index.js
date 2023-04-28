import './css/styles.css';
import { fetchCountries } from "./fetchCountries.js";
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.getElementById('search-box'),
    countryList: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
};



refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(ev) {
    const inputValue = refs.input.value.trim();
    fetchCountries(inputValue)
        .then(country => {
         console.log(country);
         if (country.length === 1) {
           refs.countryList.innerHTML = '';
           const markup = createMarkup(country);
           refs.countryInfo.insertAdjacentHTML("beforeend", markup);
           return;
       }else if (country.length < 10) {
           refs.countryInfo.innerHTML = '';
           const markup = createMarkupList(country);
           refs.countryList.insertAdjacentHTML("beforeend", markup); 
           return;  
       }  
         refs.countryList.innerHTML = '';
           Notify.info("Too many matches found. Please enter a more specific name.");    
     })
         .catch(err => {
         if (err.status === '404') {
        Notify.warning('Oops, there is no country with that name');
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
      }
         });
}

function createMarkupList(country) {
     return country
    .map(el => {
      return `
          <li class="country-item">
          <div class="country-wrapper">
          <img src="${el.flags.png}" alt="${el.flags.alt}" width="100" height="50" />
          <p class="country-desc">${el.name.official}</p>
          </div>
          </li>
          `;
           })
    .join('');
}

function createMarkup(country) {
    return country
        .map(el => {
        return `<div class="country-inform">
    <div class=“country-wrapper”>
        <img class="country-img" src="${el.flags.png}" alt="${el.flags.alt}" width="100" height="50" />
        <h2 class="country-title">${el.name.official}</h2>
    </div>
    <p class="country-capital">capital:<span>${el.capital}</span></p>
    <p class="country-population">population:<span>${el.population}</span></p>
    <p class="country-languages">languages:<span>${Object.values(el.languages)}</span></p>
    </div> `;
}).join("")
}

 



