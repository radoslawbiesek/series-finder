import { resultsList, messageTop, messageBottom, loader, sortBySelect } from "./DOMElements";
import { resetFilters } from './filters';

export const resetLayout = () => {
  messageTop.innerText = "Type a series name and click search to start.";
  messageBottom.innerText = "";
  messageBottom.classList.add("hidden");
  clearResultsList();
  resetFilters();
  sortBySelect.value = "Default";
};

export const clearResultsList = () => {
  resultsList.innerHTML = "";
}

export const showLoader = () => {
  loader.classList.remove("hidden");
};

export const hideLoader = () => {
  loader.classList.add("hidden");
};

export const displayMessage = (message, field = "top") => {
  switch (field) {
    case "top":
      messageTop.innerText = message;
      break;
    case "bottom":
      messageBottom.innerText = message;
      messageBottom.classList.remove("hidden");
      break;
  }
};
