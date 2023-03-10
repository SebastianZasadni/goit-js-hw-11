import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector("#search-form");
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more'); 

const sendRequest = async(event) => {
    event.preventDefault();
    let {
        elements: { searchQuery }
      } = event.currentTarget;
    searchQuery = searchQuery.value;
    sessionStorage.setItem('searchQuery', searchQuery);   
    await makeGallery(searchQuery);
    
  };

form.addEventListener("submit", sendRequest);


let pageNumber = 1;
const fetchImages = async(searchQuery, pageNumber) => {
    const response =
    await axios.get(`https://pixabay.com/api/?key=34267096-8e89032011ab6ec20673badb0&q=${searchQuery}&image_type=photo&orientation=horizontal&safeSearch=true&page=${pageNumber}`);
    const images = response.data;
    return images;
};

const makeGallery = async(searchQuery, pageNumber) => {
    try {
        let images = await fetchImages(searchQuery, pageNumber);
        images = images.hits;
        if (images.length === 0){
          return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        const markup = images
        .map(image => {
            return `<div class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="photo-item"/>
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
        gallery.innerHTML = markup;
        loadMore.style.visibility = "visible";
        
                   }
    catch (error) {
     console.log(error.message);
    }
};

searchQuery = sessionStorage.getItem('searchQuery');

loadMore.addEventListener('click', () => {
  makeGallery(searchQuery, pageNumber);
});

    
     



