import { fetchPage, fetchItemById } from "./fetchFunctions";
import { inputField, submitButton, resultsList, resetResults, renderItems } from "./DOMActions";

const ITEMS_PER_PAGE_APP = 12;

let state;

const resetState = () => {
  state = {
    searching: "",
    currPageApp: 0,
    currPageAPI: 0,
    dataFetched: [],
  };
};

resetState();

submitButton.addEventListener("click", () => {
  event.preventDefault();
  if (inputField.value) {
    resetResults();
    resetState();
    state.searching = inputField.value;
    state.currPageApp++;
    renderPage(state.searching, 1);
  } else {
    return;
  }
});

// Load next results on each scrolling to the end of the page
window.addEventListener("scroll", () => {
  const maxScrollingDistance =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrolledDistance = window.scrollY;
  if (Math.ceil(scrolledDistance) === maxScrollingDistance) {
    state.currPageApp++;
    renderPage(state.searching, state.currPageApp);
  }
});

const isNextFetchNeeded = (newData) => {
  return state.currPageApp * ITEMS_PER_PAGE_APP > state.dataFetched.length + newData.length;
}

const renderPage = async (keyword, page) => {
  try {
    let fetchedData = await fetchPage(keyword, page);
    state.currPageAPI++;
    if (isNextFetchNeeded(fetchedData)) {
      const nextFetchedData = await fetchPage(keyword, page + 1);
      state.currPageAPI++;
      fetchedData = [...fetchedData, ...nextFetchedData];
    }
    const extendedData = await Promise.all(fetchedData.map(item => fetchItemById(item.imdbID)));
    state.dataFetched = [...state.dataFetched, ...extendedData];
    renderItems(state.dataFetched, state.currPageApp - 1, state.currPageApp * ITEMS_PER_PAGE_APP);
    console.log(state);
  } catch(error) {
    console.log(error);
    resultsList.innerHTML = '<p>Oops! Something went wrong. Please try again.'
  }
}