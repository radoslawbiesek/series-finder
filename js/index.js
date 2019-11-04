import { fetchPage, fetchItemById } from "./fetchFunctions";
import {
  resetLayout,
  showLoader,
  hideLoader,
  displayMessage,
  clearResultsList
} from "./DOMActions";
import {
  inputField,
  submitButton,
  sortBySelect,
  resultsInfo,
  messageBottom,
  resultsList
} from "./DOMElements";
import { renderItems } from "./Item";
import { addActionOnScroll, removeActionOnScroll } from "./onScroll";
import "./filters";
import { filter } from "./filters";
import { sortBy } from "./sort";

const ITEMS_PER_PAGE_APP = 12;

let state;

const resetState = () => {
  state = {
    currPageApp: 0,
    currPageAPI: 0,
    keyword: "",
    items: [],
    totalResults: null
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

sortBySelect.addEventListener("change", () => {
  clearResultsList();
  clearResultsList();
  renderItems(
    sortBy(state.items, sortBySelect.value),
    0,
    state.currPageApp * ITEMS_PER_PAGE_APP
  );
  filter();
});

const isNextFetchNeeded = (totalResults, newData, currPageApp, items) => {
  return (
    Math.min(currPageApp * ITEMS_PER_PAGE_APP, totalResults) >
    items.length + newData.length
  );
};

const isNextFetchPossible = (fetchedData, totalResults) => {
  return parseInt(totalResults) >= fetchedData.length;
};

export const renderPage = async () => {
  showLoader();

  try {
    // Preventing multiple call and further request for non-existing page
    removeActionOnScroll(renderPage);

    // Copying state
    let { currPageApp, currPageAPI, items, keyword, totalResults } = state;

    currPageApp++;

    switch (items.length) {
      // All avalaible data is already fetched
      case parseInt(totalResults):
        state = { ...state, currPageApp };
        break;

      // Fetching new data
      default:
        let response = await fetchPage(keyword, ++currPageAPI);
        switch (response.Response) {
          case "True":
            // Setting total results if the first fetch
            if (!totalResults) {
              totalResults = response.totalResults;
              displayMessage(
                `Found ${totalResults} results for '${keyword}'`,
                resultsInfo
              );
            }

            let { Search: fetchedData } = response;

            // Fetch more data if needed
            if (
              isNextFetchNeeded(
                totalResults,
                fetchedData,
                currPageApp,
                items
              ) &&
              isNextFetchPossible(fetchedData, totalResults)
            ) {
              const { Search: nextFetchedData } = await fetchPage(
                keyword,
                ++currPageAPI
              );
              fetchedData = [...fetchedData, ...nextFetchedData];
            }

            // Fetch additional info for every item
            const extendedData = await Promise.all(
              fetchedData.map(item => fetchItemById(item.imdbID))
            );

            items = [...items, ...extendedData];

            if (isNextFetchPossible(fetchedData, totalResults)) {
              addActionOnScroll(renderPage);
            }
            state = { ...state, currPageAPI, currPageApp, items, totalResults };
            break;
          case "False":
            displayMessage(
              `Your search "${state.keyword}" did not match any series. Please try again.`,
              resultsList
            );
            hideLoader();
            return;
        }
    }

    switch (sortBySelect.value) {
      // Adding only new items if sorting is inactive
      case "Default":
        renderItems(
          items,
          (currPageApp - 1) * ITEMS_PER_PAGE_APP,
          Math.min(currPageApp * ITEMS_PER_PAGE_APP, totalResults)
        );
        break;
      // Re-rendering results list if sorting is active
      default:
        clearResultsList();
        renderItems(
          sortBy(items, sortBySelect.value),
          0,
          Math.min(currPageApp * ITEMS_PER_PAGE_APP, totalResults)
        );
        break;
    }

    filter();

    displayMessage(
      `Showing ${Math.min(
        currPageApp * ITEMS_PER_PAGE_APP,
        items.length
      )} of ${totalResults} total results`,
      messageBottom
    );
  } catch (error) {
    console.log(error);
    resetLayout();
    displayMessage(
      "Oops! Something went wrong. Please try again",
      messageBottom
    );
  }

  hideLoader();
};
