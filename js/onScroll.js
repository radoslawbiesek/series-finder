export const actionOnScroll = (callback) => {
    const maxScrollingDistance = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledDistance = window.scrollY;
    if (Math.ceil(scrolledDistance) === maxScrollingDistance) {
      callback();
    }
  };
  
export const addActionOnScroll = (callback) => {
    window.addEventListener("scroll", () => actionOnScroll(callback));
  };
  
export const removeActionOnScroll = (callback) => {
    window.removeEventListener("scroll", () => actionOnScroll(callback));
  };