import { fetchPage, fetchItemById } from "./fetchFunctions";
import {
  inputField,
  submitButton,
  resetLayout,
  renderItems,
  showLoader,
  hideLoader,
  displayMessage
} from "./DOMActions";
import { addActionOnScroll, removeActionOnScroll } from "./onScroll";

const ITEMS_PER_PAGE_APP = 12;

let state;

const resetState = () => {
  state = {
    currPageApp: 0,
    currPageAPI: 0,
    keyword: "",
    items: [],
    totalResults: false
  };
};

resetState();

submitButton.addEventListener("click", () => {
  event.preventDefault();
  if (inputField.value) {
    resetLayout();
    resetState();
    state.keyword = inputField.value;
    renderPage();
  } else {
    return;
  }
});

const isNextFetchNeeded = (newData, currPageApp, items) => {
  return currPageApp * ITEMS_PER_PAGE_APP > items.length + newData.length;
};

const isNextFetchPossible = (fetchedData, totalResults) => {
  return parseInt(totalResults) > fetchedData.length;
};

export const renderPage = async () => {
  showLoader();
  try {
    removeActionOnScroll(renderPage);
    let { currPageApp, currPageAPI, items, keyword, totalResults } = state;
    currPageApp++;

    if (totalResults && items.length === parseInt(totalResults)) {
      // all data is already fetched, only rendering
      renderItems(items, (currPageApp - 1) * ITEMS_PER_PAGE_APP, totalResults);
      state = { ...state, currPageApp };
    } else {
      // fetching data
      let response = await fetchPage(keyword, ++currPageAPI);
      switch (response.Response) {
        case "True":
          if (!totalResults) { totalResults = response.totalResults }
          let { Search: fetchedData } = response;
          displayMessage(`There are ${totalResults} results for '${keyword}'`);
          if (
            isNextFetchNeeded(fetchedData, currPageApp, items) &&
            isNextFetchPossible(fetchedData, totalResults)
          ) {
            const { Search: nextFetchedData } = await fetchPage(
              keyword,
              ++currPageAPI
            );
            fetchedData = [...fetchedData, ...nextFetchedData];
          }
          const extendedData = await Promise.all(
            fetchedData.map(item => fetchItemById(item.imdbID))
          );
          items = [...items, ...extendedData];
          renderItems(
            items,
            (currPageApp - 1) * ITEMS_PER_PAGE_APP,
            currPageApp * ITEMS_PER_PAGE_APP
          );
          if (isNextFetchPossible(fetchedData, totalResults)) {
            addActionOnScroll(renderPage);
          }
          console.log(totalResults);
          state = { ...state, currPageAPI, currPageApp, items, totalResults };
          console.log(state);
          break;
        case "False":
          displayMessage("There are no results.");
      }
    }
    displayMessage(
      `Showing ${Math.min(currPageApp * ITEMS_PER_PAGE_APP, items.length)} of ${totalResults} total results`,
      "bottom"
    );
  } catch (error) {
    console.log(error);
    resetLayout();
    displayMessage("Oops! Something went wrong. Please try again");
  }
  hideLoader();
};
