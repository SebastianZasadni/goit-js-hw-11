import { fetchImages } from './fetchImages';
import { scrollend } from 'scrollyfills';
import { scrollLoading } from './scrollLoading';

const gallery = document.querySelector('.gallery');

export const makeGallery = async (searchQuery, pageNumber) => {
  try {
    let images = await fetchImages(searchQuery, pageNumber);
    sessionStorage.setItem('imagesCount', images.totalHits);
    images = images.hits;

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
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error.message);
  }
};
