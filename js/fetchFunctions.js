export const baseURL = "http://www.omdbapi.com/?apikey=4cdcc311";
export const prefix = "https://cors-anywhere.herokuapp.com/";

export const fetchPage = async (keyword, page = 1) => {
  try {
    const res = await fetch(
      `${prefix}${baseURL}&type=series&page=${page}&s=${keyword}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchItemById = async id => {
  try {
    const res = await fetch(`${baseURL}&plot=full&i=${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
