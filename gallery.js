const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const galleryFilters = document.querySelector(".gallery-filters");
const photoCount = document.querySelector(".gallery-count");

galleryFilters.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    galleryFilters.querySelectorAll("button").forEach((filter) => {
      filter.setAttribute("aria-pressed", String(filter === button));
    });
    galleryItems.forEach((item) => {
      item.hidden = category !== "all" && item.dataset.category !== category;
    });
    const visibleCount = galleryItems.filter((item) => !item.hidden).length;
    photoCount.textContent = visibleCount + (visibleCount === 1 ? " photograph" : " photographs");
  });
});
galleryFilters.hidden = false;

const photoViewer = document.getElementById("photo-viewer");
const viewerImage = document.getElementById("viewer-image");
const viewerCaption = document.getElementById("viewer-caption");
const viewerPosition = document.getElementById("viewer-position");
let viewerItems = [];
let viewerIndex = 0;
let photoOpener = null;

function showPhotograph(index) {
  viewerIndex = (index + viewerItems.length) % viewerItems.length;
  const item = viewerItems[viewerIndex];
  const thumbnail = item.querySelector("img");
  viewerImage.alt = thumbnail.alt;
  viewerImage.src = item.getAttribute("href");
  viewerCaption.textContent = item.dataset.caption;
  viewerPosition.textContent = (viewerIndex + 1) + " / " + viewerItems.length;
}

if (typeof photoViewer.showModal === "function") {
  document.querySelectorAll("a[data-photo]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const visibleItems = galleryItems.filter((item) => !item.hidden);
      const matchingItem = galleryItems.find((item) => item.getAttribute("href") === link.getAttribute("href"));
      if (!matchingItem) return;
      event.preventDefault();
      viewerItems = visibleItems.includes(matchingItem) ? visibleItems : galleryItems;
      photoOpener = link;
      showPhotograph(viewerItems.indexOf(matchingItem));
      photoViewer.showModal();
      document.documentElement.classList.add("photo-viewer-open");
    });
  });
  document.querySelector(".viewer-close").addEventListener("click", () => photoViewer.close());
  document.querySelector(".viewer-previous").addEventListener("click", () => showPhotograph(viewerIndex - 1));
  document.querySelector(".viewer-next").addEventListener("click", () => showPhotograph(viewerIndex + 1));
  photoViewer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showPhotograph(viewerIndex + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
  photoViewer.addEventListener("click", (event) => {
    if (event.target === photoViewer) photoViewer.close();
  });
  photoViewer.addEventListener("close", () => {
    document.documentElement.classList.remove("photo-viewer-open");
    viewerImage.removeAttribute("src");
    if (photoOpener) photoOpener.focus({ preventScroll: true });
  });
}
