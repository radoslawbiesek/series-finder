// Elements list
export const resultsList = document.getElementById("results");
export const submitButton = document.getElementById("submit-button");
export const inputField = document.getElementById("input-field");
export const loader = document.getElementById("loader");
export const messageTop = document.getElementById("message-top");
export const messageBottom = document.getElementById("message-bottom");


export const resetLayout = () => {
  resultsList.innerHTML = '';
  messageTop.innerText = 'Type a series name and click search to start.';
  messageBottom.innerText = '';
  messageBottom.classList.add('hidden');
}

export const renderItem = ({
  Title: title,
  Poster: image = 'https://via.placeholder.com/250x350',
  Year: year = "N.D.",
  imdbRating: rating = "N.D.",
  Plot: desc = "Description is not available.",
  Awards: awards
}) => {
  const item = document.createElement("li");
  item.setAttribute('data-year', year.substring(0,4));
  item.setAttribute('data-rating', rating);
  item.classList.add("list-item");
  item.innerHTML = `<div class="item">
        <div class="item__image">
          <img src="${image}" alt="${title}"/>
          <span class="item__rating">${rating}</span>
        </div>
        <div class="item__text-area">
          <p class="item__title">${title}</p>
          <span class="item__year">${year.substring(0,4)}</span>
          <p class="item__desc">${desc}...</p>
          <p class="item__award">${awards}</p>
        </div>
      </div>`;
  resultsList.appendChild(item);
};

export const renderItems = (dataArr, start, stop) => {
  dataArr.slice(start, Math.min(stop, dataArr.length)).forEach(item => renderItem(item));
};

export const showLoader = () => {
  loader.classList.remove('hidden');
}

export const hideLoader = () => {
  loader.classList.add('hidden');
}

export const displayMessage = (message, field = "top") => {
  switch (field) {
    case "top":
      messageTop.innerText = message;
      break;
    case "bottom":
      messageBottom.innerText = message;
      messageBottom.classList.remove('hidden');
      break;
  }
}