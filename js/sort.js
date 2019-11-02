export const sortBy = (items, sortingBy) => {
  const itemsToSort = [...items];
  let sortedItems;
  switch (sortingBy) {
    case "Z-A":
      sortedItems = itemsToSort.sort((a, b) => b.Title.localeCompare(a.Title));
      break;
    case "A-Z":
      sortedItems = itemsToSort.sort((a, b) => a.Title.localeCompare(b.Title));
      break;
    case "Highest rating":
      sortedItems = itemsToSort.sort((a, b) => {
        const ratingA = !isNaN(a.imdbRating) ? parseFloat(a.imdbRating) : 0;
        const ratingB = !isNaN(b.imdbRating) ? parseFloat(b.imdbRating) : 0;
        return ratingB - ratingA;
      });
      break;
    case "Lowest rating":
      sortedItems = itemsToSort.sort((a, b) => {
        const ratingA = !isNaN(a.imdbRating) ? parseFloat(a.imdbRating) : 0;
        const ratingB = !isNaN(b.imdbRating) ? parseFloat(b.imdbRating) : 0;
        return ratingA - ratingB;
      });
      break;
    case "Earliest release":
      sortedItems = itemsToSort.sort((a, b) => {
        const dateA = new Date(a.Released);
        const dateB = new Date(b.Released);
        return dateA - dateB;
      });
      break;
    case "Latest release":
      sortedItems = itemsToSort.sort((a, b) => {
        const dateA = new Date(a.Released);
        const dateB = new Date(b.Released);
        return dateB - dateA;
      });
      break;
    default:
      sortedItems = itemsToSort;
      break;
  }
  return sortedItems;
};
