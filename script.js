/* =========================================================
   ANAZORI V16.0
   Navigation & Accessibility
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");

    const menuClose = document.getElementById("menuClose");

    const mobileMenu = document.getElementById("mobileMenu");

    const mobileOverlay = document.getElementById("mobileOverlay");

    const mobileLinks = document.querySelectorAll(
        ".mobile-nav a"
    );


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (
        !menuToggle ||
        !menuClose ||
        !mobileMenu ||
        !mobileOverlay
    ) {
        return;
    }


    /* =====================================================
       OPEN MOBILE MENU
    ===================================================== */

    const openMenu = () => {

        mobileMenu.classList.add("is-open");

        mobileOverlay.classList.add("is-visible");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        mobileOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        menuClose.focus();

    };


    /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

    const closeMenu = () => {

        mobileMenu.classList.remove("is-open");

        mobileOverlay.classList.remove("is-visible");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        mobileOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        menuToggle.focus();

    };


    /* =====================================================
       BUTTON EVENTS
    ===================================================== */

    menuToggle.addEventListener(
        "click",
        openMenu
    );


    menuClose.addEventListener(
        "click",
        closeMenu
    );


    mobileOverlay.addEventListener(
        "click",
        closeMenu
    );


    /* =====================================================
       CLOSE AFTER NAVIGATION
    ===================================================== */

    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {
                closeMenu();
            }
        );

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("is-open")
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       RESPONSIVE CLEANUP
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                mobileMenu.classList.contains("is-open")
            ) {

                mobileMenu.classList.remove(
                    "is-open"
                );

                mobileOverlay.classList.remove(
                    "is-visible"
                );

                document.body.classList.remove(
                    "menu-open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenu.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }

        }
    );


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !mobileMenu.classList.contains("is-open")
            ) {
                return;
            }


            const clickedInsideMenu =
                mobileMenu.contains(event.target);


            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMenu();

            }

        }
    );

});
