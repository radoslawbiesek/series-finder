import { fetchPage, fetchItemById } from "./fetchFunctions";
import { inputField, submitButton, resetResults, renderItem } from "./DOMActions";

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
  resetResults();
  resetState();
  state.searching = inputField.value;
  state.currPageApp++;
  renderPage(state.searching);
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

const renderPage = (keyword, page = 1) => {
  fetchPage(keyword, page).then(data => {
    data.forEach(item => {
      if (item.Type === "series") {
        fetchItemById(item.imdbID).then(item => {
          state.dataFetched = [...state.dataFetched, item];
          renderItem(item);
        });
      }
    });
  });
};