// // Sticky Header on Scroll
// window.addEventListener('scroll', () => {
//     const header = document.querySelector('header');
//     header.classList.toggle('scrolled', window.scrollY > 50);
// });

// // Smooth scroll for internal links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });


let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide img');
const totalSlides = slides.length;

function showSlide(index) {
    // Use modulo operator to cycle through slides
    document.querySelector('.carousel-slide').style.transform = `translateX(${-index * (100 / totalSlides)}%)`;
}

// Function to go to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // Wrap around to the first slide
    showSlide(currentSlide);
}

// Autoplay functionality
setInterval(nextSlide, 3000); // Change slide every 3 seconds

// JavaScript to trigger animations when elements come into view
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.case-study-card');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, {
      threshold: 0.2 // Trigger animation when 20% of the element is visible
    });
  
    // Observe each card
    cards.forEach(card => {
      observer.observe(card);
    });
  });
  

