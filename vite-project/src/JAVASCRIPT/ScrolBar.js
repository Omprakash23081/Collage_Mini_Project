export function setupScrolBar() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".carousel_slide img");
  const totalSlides = slides.length;

  function showSlide(index) {
    // Use modulo operator to cycle through slides
    try {
      const carousel = document.querySelector(".carousel_slide");
      if (carousel) {
        carousel.style.transform = `translateX(${
          -index * (100 / totalSlides)
        }%)`;
      }
    } catch (error) {
      console.error("Error updating slide position:", error);
    }
  }

  // Function to go to the next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // Wrap around to the first slide
    showSlide(currentSlide);
  }

  if (totalSlides > 0) {
    setInterval(nextSlide, 3000);
  } else {
    console.warn("No slides found for the carousel.");
  }
}
