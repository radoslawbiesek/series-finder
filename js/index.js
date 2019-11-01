import { fetchPage, fetchItemById } from "./fetchFunctions";
import { inputField, submitButton, resultsList, resetResults, renderItems, showLoader, hideLoader, displayMessage } from "./DOMActions";
import { addActionOnScroll, removeActionOnScroll } from './onScroll';

const ITEMS_PER_PAGE_APP = 12;

let state;

const resetState = () => {
  state = {
    currPageApp: 0,
    currPageAPI: 0,
    keyword: "",
    items: []
  };
};

resetState();

submitButton.addEventListener("click", () => {
  event.preventDefault();
  if (inputField.value) {
    resetResults();
    resetState();
    state.keyword = inputField.value;
    renderPage();
  } else {
    return;
  }
});

const isNextFetchNeeded = (newData, currPageApp, items) => {
  return ( currPageApp * ITEMS_PER_PAGE_APP > items.length + newData.length);
};

const renderPage = async () => {
  try {
    showLoader();
    removeActionOnScroll(renderPage);
    let { currPageApp, currPageAPI, items, keyword } = state;
    currPageApp++;
    let response = await fetchPage(keyword, ++currPageAPI);
    console.log(response);
    
    if (response.Response === "True") {
      let { fetchedData, totalResults } = response;
      if (isNextFetchNeeded(fetchedData, currPageApp, items)) {
        const { Search: nextFetchedData } = await fetchPage(keyword, ++currPageAPI);
        fetchedData = [...fetchedData, ...nextFetchedData];
      }
      const extendedData = await Promise.all(fetchedData.map(item => fetchItemById(item.imdbID)));
      items = [...items, ...extendedData];
      renderItems(items, (currPageApp - 1) * ITEMS_PER_PAGE_APP, currPageApp * ITEMS_PER_PAGE_APP);
      addActionOnScroll(renderPage);
      state = {...state, currPageAPI, currPageApp, items};
      console.log('of ' + state.items.length);
    } else {
      displayMessage('There are no results.');
    }
    hideLoader();
  } catch (error) {
    console.log(error);
    resultsList.innerHTML = "<p>Oops! Something went wrong. Please try again.";
    hideLoader();
  }
};
