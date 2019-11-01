import { renderPage as callback } from "./index";

export const handleOnScroll = () => {
  const maxScrollingDistance =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrolledDistance = window.scrollY;
  if (Math.ceil(scrolledDistance) === maxScrollingDistance) {
    callback();
  }
};

export const addActionOnScroll = () => {
  window.addEventListener("scroll", handleOnScroll);
};

export const removeActionOnScroll = () => {
  window.removeEventListener("scroll", handleOnScroll);
};
