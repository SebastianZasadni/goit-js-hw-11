import axios from 'axios';

export const fetchImages = async (searchQuery, pageNumber) => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=34267096-8e89032011ab6ec20673badb0&q=${searchQuery}&image_type=photo&orientation=horizontal&safeSearch=true&page=${pageNumber}&per_page=40`
  );
  const images = response.data;
  return images;
};
