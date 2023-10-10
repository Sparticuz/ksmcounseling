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
  if (window.scrollY <= 585) {
    navbarCollapsible.classList.remove("navbar-shrink");
  } else {
    navbarCollapsible.classList.add("navbar-shrink");
  }
};

/**
 * Add DomContentLoaded event to handle the scrollbar and form
 */
document.addEventListener("DOMContentLoaded", () => {
  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      offset: 74,
      target: "#mainNav",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  // Convert NodeListOf into an array
  const responsiveNavItems = Array.prototype.slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link"),
  );
  for (const responsiveNavItem of responsiveNavItems) {
    responsiveNavItem.addEventListener("click", () => {
      if (
        navbarToggler &&
        window.getComputedStyle(navbarToggler).display !== "none"
      ) {
        navbarToggler.click();
      }
    });
  }

  // Now work on the form
  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = document.querySelector("#submitButton");
      if (submitButton) {
        submitButton.setAttribute("disabled", "disabled");
      }

      const formData = new FormData(form);
      fetch(form.action, {
        body: JSON.stringify(Object.fromEntries(formData)),
        cache: "no-cache",
        method: form.method,
        mode: "cors",
      })
        .then((response) => {
          if (response.status === 204) {
            // Hide the error div if needed
            const errorDiv = document.querySelector("#submitErrorMessage");
            if (errorDiv) {
              if (!errorDiv.classList.contains("d-none")) {
                errorDiv.classList.add("d-none");
              }
              const responseDiv = document.querySelector(
                "#submitSuccessMessage",
              );
              if (responseDiv) {
                responseDiv.classList.remove("d-none");
              }
            }
            return;
          }
          const responseDiv = document.querySelector("#submitErrorMessage");
          if (responseDiv) {
            responseDiv.classList.remove("d-none");
          }
        })
        .catch(() => {
          const responseDiv = document.querySelector("#submitErrorMessage");
          if (responseDiv) {
            responseDiv.classList.remove("d-none");
          }
        });
    });
  }
});
