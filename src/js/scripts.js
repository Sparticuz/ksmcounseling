//
// Scripts
//

/**
 * Navbar Shrink Function
 * @returns void
 */
const navbarShrink = () => {
  const navbarCollapsible = document.body.querySelector("#mainNav");
  if (!navbarCollapsible) {
    return;
  }
  if (window.scrollY === 0) {
    navbarCollapsible.classList.remove("navbar-shrink");
  } else {
    navbarCollapsible.classList.add("navbar-shrink");
  }
};

/**
 * Add DomContentLoaded event to handle the scrollbar and form
 */
document.addEventListener("DOMContentLoaded", (event) => {
  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      offset: 74,
      target: "#mainNav",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = Array.prototype.slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map((responsiveNavItem) => {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  // Now work on the form
  const form = document.querySelector("#contactForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      body: JSON.stringify(Object.fromEntries(formData)),
      cache: "no-cache",
      method: form.method,
      mode: "cors",
    })
      .then((response) => {
        if (response.status === 204) {
          const responseDiv = document.querySelector("#submitSuccessMessage");
          responseDiv.classList.remove("d-none");
          return;
        }
        const responseDiv = document.querySelector("#submitErrorMessage");
        responseDiv.classList.remove("d-none");
        return;
      })
      .catch((error) => {
        const responseDiv = document.querySelector("#submitErrorMessage");
        responseDiv.classList.remove("d-none");
        return;
      });
  });
});
