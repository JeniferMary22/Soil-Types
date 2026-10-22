
document.addEventListener("DOMContentLoaded", () => {
  // Reveal sections as they enter the viewport
  const sections = document.querySelectorAll(
    ".intro, .types-section, .importance, .quiz-section"
  );

  sections.forEach(section => {
    section.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  sections.forEach(section => observer.observe(section));

  // Animate cards whenever the grid is rendered or filtered
  const soilGrid = document.getElementById("soilGrid");

  if (soilGrid) {
    const cardObserver = new MutationObserver(() => {
      soilGrid.querySelectorAll(".soil-card").forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
      });
    });

    cardObserver.observe(soilGrid, {
      childList: true
    });

    soilGrid.querySelectorAll(".soil-card").forEach((card, index) => {
      card.style.animationDelay = `${index * 100}ms`;
    });
  }

  // Smooth scroll for internal navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches ? "auto" : "smooth",
          block: "start"
        });
      }
    });
  });
});
