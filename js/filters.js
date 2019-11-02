export const yearInput = document.getElementById("year-input");
export const ratingInput = document.getElementById("rating-input");
export const resetFiltersButton = document.getElementById("reset-filters");

export const filter = () => {
  const items = document.querySelectorAll(".list-item");
  const yearValue = yearInput.value;
  const ratingValue = ratingInput.value ? ratingInput.value : 0;
  items.forEach(item => {
    const itemYearValue = item.getAttribute("data-year");
    const itemRatingValue = !isNaN(item.getAttribute("data-rating"))
      ? parseFloat(item.getAttribute("data-rating"))
      : 0;
    if (itemYearValue.includes(yearValue) && itemRatingValue >= ratingValue) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
};

export const resetFilters = () => {
  yearInput.value = "";
  ratingInput.value = "";
  filter();
};

yearInput.addEventListener("keyup", filter);
ratingInput.addEventListener("keyup", filter);
resetFiltersButton.addEventListener("click", () => {
  event.preventDefault();
  resetFilters();
});
