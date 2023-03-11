import axios from 'axios';
import Notiflix from 'notiflix';
// Opisany w dokumentacji
import SimpleLightbox from 'simplelightbox';
// Dodatkowy import stylów
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let pageNumber = 1;
let imagesCount = 40;

const sendRequest = async event => {
  gallery.innerHTML = '';
  sessionStorage.clear();
  event.preventDefault();
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
        return `<a href="${image.largeImageURL}" class="gallery__link">
            <img src="${image.webformatURL}" class="gallery__image" alt="${image.tags}" loading="lazy" class="photo-item"/>
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
            </div>`;
      })
      .join('');
    gallery.innerHTML = gallery.innerHTML + createGallery;
    loadMore.style.visibility = 'visible';
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } catch (error) {
    console.log(error.message);
  }
};

searchQuery = sessionStorage.getItem('searchQuery');

loadMore.addEventListener('click', () => {
  pageNumber++;
  imagesCount += 40;
  if (imagesCount >= sessionStorage.getItem('imagesCount')) {
    return Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results..`
    );
  }
  makeGallery(searchQuery, pageNumber);
});

// const { height: cardHeight } = gallery.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
