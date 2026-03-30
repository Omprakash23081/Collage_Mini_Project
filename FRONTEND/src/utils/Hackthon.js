export function setHackthon() {
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
      threshold: 0.01,
    }
  );

  // Observe each card
  cards.forEach((card) => {
    observer.observe(card);
  });
}
