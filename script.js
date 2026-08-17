/* =====================================
   LEGACY CHAIRS
   Main JavaScript
===================================== */


/* CURSOR GLOW */

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});


/* MOBILE MENU */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});


/* HERO 3D MOUSE MOVEMENT */

const heroChair = document.getElementById("heroChair");

document.addEventListener("mousemove", (e) => {

  if (window.innerWidth < 900) return;

  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);

  heroChair.style.transform =
    `translateY(${y * -12}px)
     rotateY(${x * 15}deg)
     rotateX(${y * -8}deg)`;
});


/* PRODUCT FILTER */

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    filters.forEach(btn => {
      btn.classList.remove("active");
    });

    filter.classList.add("active");

    const category = filter.dataset.filter;

    products.forEach(product => {

      if (
        category === "all" ||
        product.dataset.category === category
      ) {
        product.classList.remove("hidden");
      } else {
        product.classList.add("hidden");
      }

    });

  });

});


/* PRODUCT MODAL */

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalWhatsapp = document.getElementById("modalWhatsapp");


/*
   CHANGE THIS NUMBER
   Put your WhatsApp number here.

   India example:
   919876543210

   Don't use + or spaces.
*/

const WHATSAPP_NUMBER = "919876543210";


function openProduct(productName) {

  modalTitle.textContent = productName;

  const message =
    `Hello Legacy Chairs!%0A%0A` +
    `I am interested in: ${encodeURIComponent(productName)}%0A%0A` +
    `Please share details, availability and pricing.`;

  modalWhatsapp.href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  modal.classList.add("open");

}


document.querySelectorAll(".enquire").forEach(button => {

  button.addEventListener("click", () => {

    const productName = button.dataset.product;

    openProduct(productName);

  });

});


closeModal.addEventListener("click", () => {
  modal.classList.remove("open");
});


modal.addEventListener("click", (e) => {

  if (e.target === modal) {
    modal.classList.remove("open");
  }

});


/* MAIN WHATSAPP BUTTON */

const whatsappBtn = document.getElementById("whatsappBtn");

const mainMessage =
  "Hello Legacy Chairs! I would like to know more about your chairs and current collection.";

whatsappBtn.href =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mainMessage)}`;


/* ESCAPE KEY */

document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {
    modal.classList.remove("open");
    mobileMenu.classList.remove("open");
  }

});


/* CURRENT YEAR */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* REVEAL ANIMATION */

const revealElements = document.querySelectorAll(
  ".product-card, .feature, .about-content, .section-heading"
);

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

      }

    });

  },
  {
    threshold: 0.12
  }
);


revealElements.forEach(element => {

  element.style.opacity = "0";
  element.style.transform = "translateY(30px)";
  element.style.transition =
    "opacity .8s ease, transform .8s ease";

  observer.observe(element);

});
