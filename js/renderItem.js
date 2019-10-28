import { resultsList } from './ElementsList';

const renderItem = ({
  Title: title,
  Poster: image = 'https://via.placeholder.com/250x350',
  Year: year = "N.D.",
  imdbRating: rating = "N.D.",
  Plot: desc = "Description is not available.",
  Awards: awards
}) => {
  const el = document.createElement("li");
  el.innerHTML = `<div class="item">
        <div class="item__image">
          <img src="${image}" alt="${title}"/>
          <span class="item__rating">${rating}</span>
        </div>
        <div class="item__text-area">
          <p class="item__title">${title}</p>
          <span class="item__year">${year}</span>
          <p class="item__desc">${desc}</p>
          <p class="item__award">${awards}</p>
        </div>
      </div>`;
  resultsList.appendChild(el);
};

export default renderItem;
