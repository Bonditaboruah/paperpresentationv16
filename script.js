/* ============================================================
   ANAZORI V16.0
   RESPONSIVE WEBSITE JAVASCRIPT
============================================================ */


/* ============================================================
   ELEMENTS
============================================================ */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

const progressBar = document.getElementById("progressBar");

const countdown = document.getElementById("countdown");

const daysElement = document.getElementById("days");

const hoursElement = document.getElementById("hours");

const minutesElement = document.getElementById("minutes");

const secondsElement = document.getElementById("seconds");

const revealElements =
  document.querySelectorAll(".reveal");


/* ============================================================
   MOBILE NAVIGATION
============================================================ */

function openMenu() {

  if (!menuToggle || !navLinks) {
    return;
  }

  navLinks.classList.add("open");

  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Close navigation menu"
  );

}


function closeMenu() {

  if (!menuToggle || !navLinks) {
    return;
  }

  navLinks.classList.remove("open");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Open navigation menu"
  );

}


if (menuToggle && navLinks) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        navLinks.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    }
  );


  /* Close menu after selecting a link */

  const navigationItems =
    navLinks.querySelectorAll("a");

  navigationItems.forEach((link) => {

    link.addEventListener(
      "click",
      () => {
        closeMenu();
      }
    );

  });


  /* Close menu when clicking outside */

  document.addEventListener(
    "click",
    (event) => {

      const clickedInsideNav =
        navLinks.contains(event.target);

      const clickedMenuButton =
        menuToggle.contains(event.target);

      if (
        !clickedInsideNav &&
        !clickedMenuButton
      ) {

        closeMenu();

      }

    }
  );


  /* Close menu with Escape */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeMenu();

        menuToggle.focus();

      }

    }
  );

}


/* ============================================================
   SCROLL PROGRESS
============================================================ */

function updateScrollProgress() {

  if (!progressBar) {
    return;
  }

  const scrollTop =
    window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  if (documentHeight <= 0) {

    progressBar.style.width = "0%";

    return;

  }

  const progress =
    (scrollTop / documentHeight) * 100;

  progressBar.style.width =
    `${Math.min(progress, 100)}%`;

}


window.addEventListener(
  "scroll",
  updateScrollProgress,
  { passive: true }
);


updateScrollProgress();


/* ============================================================
   REVEAL ON SCROLL
============================================================ */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


if (
  prefersReducedMotion ||
  !("IntersectionObserver" in window)
) {

  revealElements.forEach(
    (element) => {

      element.classList.add("visible");

    }
  );

} else {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(
          (entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(element);

    }
  );

}


/* ============================================================
   COUNTDOWN
============================================================ */

/*
  Event:
  5 November 2026
  10:00 AM
*/

const eventDate =
  new Date(
    "2026-11-05T10:00:00"
  );


function padNumber(
  number,
  length
) {

  return String(number)
    .padStart(length, "0");

}


function updateCountdown() {

  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    return;
  }


  const now =
    new Date();


  const difference =
    eventDate.getTime() -
    now.getTime();


  if (difference <= 0) {

    daysElement.textContent = "000";

    hoursElement.textContent = "00";

    minutesElement.textContent = "00";

    secondsElement.textContent = "00";

    if (countdown) {

      countdown.setAttribute(
        "aria-label",
        "ANAZORI V16.0 has started"
      );

    }

    return;

  }


  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  const days =
    Math.floor(
      totalSeconds / 86400
    );


  const hours =
    Math.floor(
      (totalSeconds % 86400) / 3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );


  const seconds =
    totalSeconds % 60;


  daysElement.textContent =
    padNumber(days, 3);


  hoursElement.textContent =
    padNumber(hours, 2);


  minutesElement.textContent =
    padNumber(minutes, 2);


  secondsElement.textContent =
    padNumber(seconds, 2);

}


updateCountdown();


setInterval(
  updateCountdown,
  1000
);


/* ============================================================
   ACTIVE NAVIGATION
============================================================ */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const navAnchors =
  document.querySelectorAll(
    ".nav-links a[href^='#']"
  );


if (
  "IntersectionObserver" in window &&
  sections.length > 0
) {

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (!entry.isIntersecting) {
              return;
            }


            const currentId =
              entry.target.id;


            navAnchors.forEach(
              (link) => {

                const targetId =
                  link
                    .getAttribute("href")
                    ?.replace("#", "");


                if (
                  targetId === currentId
                ) {

                  link.classList.add(
                    "active"
                  );

                } else {

                  link.classList.remove(
                    "active"
                  );

                }

              }
            );

          }
        );

      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );


  sections.forEach(
    (section) => {

      sectionObserver.observe(section);

    }
  );

}


/* ============================================================
   ACTIVE NAV STYLING
============================================================ */

const activeNavStyle =
  document.createElement("style");


activeNavStyle.textContent = `

  .nav-links a.active {
    color: var(--accent);
  }

  .nav-links a.active::after {
    width: 100%;
  }

`;


document.head.appendChild(
  activeNavStyle
);


/* ============================================================
   RESIZE HANDLING
============================================================ */

let resizeTimer;


window.addEventListener(
  "resize",
  () => {

    clearTimeout(resizeTimer);


    resizeTimer =
      setTimeout(
        () => {

          /*
            If the browser becomes wider than the
            mobile breakpoint, make sure the mobile
            menu state does not remain stuck open.
          */

          if (
            window.innerWidth > 1000
          ) {

            closeMenu();

          }

        },
        150
      );

  }
);


/* ============================================================
   KEYBOARD ACCESSIBILITY
============================================================ */

document.addEventListener(
  "keydown",
  (event) => {

    /*
      Pressing "/" while not typing in an input
      returns focus to the first navigation link.
    */

    if (
      event.key === "/" &&
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA" &&
      document.activeElement.tagName !== "SELECT"
    ) {

      event.preventDefault();

      const firstNavLink =
        navLinks?.querySelector("a");

      if (firstNavLink) {

        firstNavLink.focus();

      }

    }

  }
);


/* ============================================================
   PREVENT FOCUS TRAP ON DISABLED BUTTONS
============================================================ */

/*
  Disabled buttons naturally cannot receive focus.
  This section intentionally contains no custom
  keyboard handling so normal browser accessibility
  behavior remains intact.
*/


/* ============================================================
   PAGE READY
============================================================ */

document.documentElement.classList.add(
  "js-enabled"
);
