export const baseURL = "http://www.omdbapi.com/?apikey=4cdcc311";

export const fetchPage = (keyword, page = 1) => {
  return fetch(`${baseURL}&type=series&page=${page}&s=${keyword}`)
    .then(res => res.json())
    .then(data => data.Search)
    .catch(error => console.log(error));
};

export const fetchItemById = id => {
  return fetch(`${baseURL}&i=${id}`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error));
};
