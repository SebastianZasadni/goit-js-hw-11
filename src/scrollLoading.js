import { makeGallery } from './makeGallery';

let pageNumber = 1;

export const scrollLoading = document.addEventListener('scrollend', event => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    if (pageNumber === 11) {
      return Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    } else {
      pageNumber++;
      const searchQuery = sessionStorage.getItem('searchQuery');
      makeGallery(searchQuery, pageNumber);
    }
  }
});
