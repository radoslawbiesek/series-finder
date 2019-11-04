import { resultsList } from "./DOMElements";

export const renderItems = (dataArr, start, stop) => {
  dataArr
    .slice(start, Math.min(stop, dataArr.length))
    .forEach(item => renderItem(item));
};

export const renderItem = ({
  Title: title,
  Poster: image,
  Year: year = "N.D.",
  imdbRating: rating = "N.D.",
  Plot,
  Awards: awards,
  Genre: genre = "N.D.",
  Runtime: runtime = "N.D.",
  totalSeasons = "N.D."
}) => {
  // Shortening plot to max 100 characters
  let plot;
  if (Plot.length <= 100) {
    plot = Plot;
  } else if (Plot === "N/A") {
    plot = "Description not available.";
  } else {
    const shortenedPlot = Plot.substring(0, 100);
    const formatedPlot = `${shortenedPlot.substring(
      0,
      shortenedPlot.lastIndexOf(" ")
    )} [...]`;
    plot = formatedPlot;
  }

  // Creating DOM elements
  const listEl = document.createElement("li");
  listEl.setAttribute("data-year", year.substring(0, 4));
  listEl.setAttribute("data-rating", rating);
  listEl.classList.add("list-element");

  const item = document.createElement("div");
  item.classList.add("item");
  listEl.appendChild(item);

  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("item__image-wrapper");
  item.appendChild(imgWrapper);

  const txtWrapper = document.createElement("div");
  txtWrapper.classList.add("item__text-wrapper");
  item.appendChild(txtWrapper);

  // Overlay
  const overlayDiv = document.createElement("div");
  overlayDiv.classList.add("item__overlay");
  imgWrapper.appendChild(overlayDiv);

  const seasonsType = document.createElement("p");
  seasonsType.classList.add("item__type");
  seasonsType.innerText = "Total seasons:";
  overlayDiv.appendChild(seasonsType);

  const seasonsDesc = document.createElement("p");
  seasonsDesc.classList.add("item__desc");
  seasonsDesc.innerText = totalSeasons;
  overlayDiv.appendChild(seasonsDesc);

  const runtimeType = document.createElement("p");
  runtimeType.classList.add("item__type");
  runtimeType.innerText = "Runtime:";
  overlayDiv.appendChild(runtimeType);

  const runtimeDesc = document.createElement("p");
  runtimeDesc.classList.add("item__desc");
  runtimeDesc.innerText = runtime;
  overlayDiv.appendChild(runtimeDesc);

  const plotType = document.createElement("p");
  plotType.classList.add("item__type");
  plotType.innerText = "Plot:";
  overlayDiv.appendChild(plotType);

  const plotDesc = document.createElement("p");
  plotDesc.classList.add("item__desc");
  plotDesc.innerText = plot;
  overlayDiv.appendChild(plotDesc);

  // Img wrapper
  const imgEl = document.createElement("img");
  imgEl.classList.add("item__image");
  imgEl.setAttribute("src", image);
  imgEl.setAttribute(
    "onerror",
    "this.src ='https://dummyimage.com/250x375/000/fff.jpg&text=No+image+avalaible';"
  );
  imgEl.setAttribute("alt", title);
  imgWrapper.appendChild(imgEl);

  const ratingSpan = document.createElement("span");
  ratingSpan.classList.add("item__rating");
  ratingSpan.innerText = rating;
  imgWrapper.appendChild(ratingSpan);

  // Txt wrapper
  const titlePar = document.createElement("p");
  titlePar.classList.add("item__title");
  titlePar.innerText = title;
  txtWrapper.appendChild(titlePar);

  const titleInfo = document.createElement("p");
  titleInfo.classList.add("item__title-info");
  titleInfo.innerText = `${year.substring(0, 4)} | ${genre
    .split(",")
    .slice(0, 2)
    .join(",")}`;
  txtWrapper.appendChild(titleInfo);

  if (awards !== "N/A") {
    const awardsSpan = document.createElement("span");
    awardsSpan.classList.add("item__award");
    awardsSpan.innerHTML = '<i class="fas fa-trophy"></i>';
    imgWrapper.appendChild(awardsSpan);

    const awardsType = document.createElement("p");
    awardsType.classList.add("item__type");
    awardsType.innerText = "Awards:";
    overlayDiv.appendChild(awardsType);

    const awardsDesc = document.createElement("p");
    awardsDesc.classList.add("item__desc");
    awardsDesc.innerText = awards;
    overlayDiv.appendChild(awardsDesc);
  }

  resultsList.appendChild(listEl);
};
