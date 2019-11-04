import {
  resultsList,
  resultsInfo,
  loader,
  sortBySelect,
  messageBottom,
  showFiltersButton,
  filtersForm
} from "./DOMElements";
import { resetFilters } from "./filters";

export const resetLayout = () => {
  resultsInfo.innerText = "";
  messageBottom.innerText = "";
  messageBottom.classList.add("hidden");
  clearResultsList();
  resetFilters();
  sortBySelect.value = "Default";
};

export const clearResultsList = () => {
  resultsList.innerHTML = "";
};

export const showLoader = () => {
  resultsList.classList.remove("items--empty");
  loader.classList.remove("hidden");
};

export const hideLoader = () => {
  loader.classList.add("hidden");
};

export const displayMessage = (message, field) => {
  field.innerText = message;
  field.classList.remove("hidden");
};

export const toggleFilters = () => {
  filtersForm.classList.toggle("hidden");
};

showFiltersButton.addEventListener("click", toggleFilters);
