import renderItem from './renderItem';
import { inputField, submitButton } from './ElementsList'

const baseURL = "http://www.omdbapi.com/?apikey=4cdcc311";

const fetchPage = (keyword, page = 1) => {
  return fetch(`${baseURL}&type=series&page=${page}&s=${keyword}`)
    .then(res => res.json())
    .then(data => data.Search)
    .catch(error => console.log(error));
};

const fetchItemById = (id) => {
  return fetch(`${baseURL}&i=${id}`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error));
};

submitButton.addEventListener('click', () => {
    event.preventDefault();
    const id = inputField.value;
    fetchItemById(id).then(data => renderItem(data))
});

