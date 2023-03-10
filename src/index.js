import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {scrollend} from 'scrollyfills';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const inputArea = document.querySelector('.input-area');
const submitBtn = document.querySelector('.submit-button');
let pageNumber = 1;
let imagesCount = 40;

inputArea.addEventListener('input', () => (submitBtn.disabled = false));

const sendRequest = async event => {
  gallery.innerHTML = '';
  sessionStorage.removeItem('searchQuery');
  await event.preventDefault();
  let {
    elements: { searchQuery },
  } = event.currentTarget;
  searchQuery = searchQuery.value;
  sessionStorage.setItem('searchQuery', searchQuery);
  await makeGallery(searchQuery);
  const totalHits = sessionStorage.getItem('imagesCount');
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
};

form.addEventListener('submit', sendRequest);

const fetchImages = async (searchQuery, pageNumber) => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=34267096-8e89032011ab6ec20673badb0&q=${searchQuery}&image_type=photo&orientation=horizontal&safeSearch=true&page=${pageNumber}&per_page=40`
  );
  const images = response.data;
  return images;
};

const makeGallery = async (searchQuery, pageNumber) => {
  try {
    let images = await fetchImages(searchQuery, pageNumber);
    sessionStorage.setItem('imagesCount', images.totalHits);
    images = images.hits;

    if (images.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    const createGallery = images
      .map(image => {
        return `<div class="gallery__item"><a href="${image.largeImageURL}" class="gallery__link">
            <img src="${image.webformatURL}" class="gallery__image" alt="${image.tags}" loading="lazy"/>
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${image.likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${image.views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${image.comments}
              </p>
              <p class="info-item">
                <b>Download</b>
                ${image.downloads}
              </p>
            </div>
            </div>`;
      })
      .join('');
    gallery.innerHTML = gallery.innerHTML + createGallery;
        const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
          } catch (error) {
   
  }
};

document.addEventListener('scroll', event => {
  const {scrollTop,clientHeight,scrollHeight} = document.documentElement;
  if ((scrollTop+clientHeight)>=scrollHeight){
    Notiflix.Loading.standard('Loading..');
  setTimeout(() => { 
  pageNumber++;
  imagesCount += 40;
  if (imagesCount >= sessionStorage.getItem('imagesCount')) {
    return Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results..`
    );
  }
  const searchQuery = sessionStorage.getItem('searchQuery');
  Notiflix.Loading.remove();
  makeGallery(searchQuery, pageNumber);
  
}, 1000); 
  }
  });


  
