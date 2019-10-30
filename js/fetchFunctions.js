export const baseURL = "http://www.omdbapi.com/?apikey=4cdcc311";

export const fetchPage = async (keyword, page = 1) => {
  try {
    const res = await fetch(`${baseURL}&type=series&page=${page}&s=${keyword}`);
    const data = await res.json();
    return data.Search;
  } catch (error) {
    console.log(error);
  }
};

export const fetchItemById = async id => {
  try {
    const res = await fetch(`${baseURL}&i=${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
