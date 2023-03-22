import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { sendRequest } from './sendRequest';
Notiflix.Notify.init({ position: 'center-bottom' });

const form = document.querySelector('#search-form');
const inputArea = document.querySelector('.input-area');
const submitBtn = document.querySelector('.submit-button');

inputArea.addEventListener('input', () => (submitBtn.disabled = false));

form.addEventListener('submit', sendRequest);
