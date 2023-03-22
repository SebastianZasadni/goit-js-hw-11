import Notiflix from 'notiflix';
import { makeGallery } from './makeGallery';

const gallery = document.querySelector('.gallery');

export const sendRequest = async event => {
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
  if (totalHits == 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }
};
