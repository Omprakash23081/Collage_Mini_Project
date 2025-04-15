export function setHackthon() {
  // Directly query the cards and start observing
  const cards = document.querySelectorAll(".case-study-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
        }
      });
    },
    {
      threshold: 0.2, // Trigger animation when 20% of the element is visible
    }
  );

  // Observe each card
  cards.forEach((card) => {
    observer.observe(card);
  });
}

