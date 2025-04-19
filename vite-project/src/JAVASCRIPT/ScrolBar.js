export function setupScrolBar() {
  let currentSlide = 0;
  const carousel = document.querySelector(".carousel_slide");
  const slides = carousel ? carousel.querySelectorAll("img") : [];
  const totalSlides = slides.length;

  function showSlide(index) {
    if (carousel && totalSlides > 0) {
      carousel.style.transform = `translateX(${-index * 100}%)`;
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  if (totalSlides > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 3000);
  } else {
    console.warn("No slides found.");
  }
}
