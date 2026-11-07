document.getElementById("year").textContent = new Date().getFullYear();

// Preserve links shared before Personal became a separate page.
if (!document.getElementById("personal") && ["#personal", "#personal-gallery"].includes(window.location.hash)) {
  window.location.replace("personal.html" + window.location.hash);
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("motion-ready");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}
