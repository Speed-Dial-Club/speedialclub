function initRouter() {

    const pages = document.querySelectorAll(".page");
    const mainContainer = document.querySelector(".container");
    const footer = document.querySelector(".footer");

    function checkRoute() {

        pages.forEach(page => page.classList.remove("active"));

        const route = window.location.hash.replace("#", "");

        const page = document.querySelector(
            `.page[data-route="${route}"]`
        );

        if (page) {

            mainContainer.style.display = "none";
            footer.style.display = "none";

            page.classList.add("active");

            document.body.style.overflow = "auto";

        } else {

            mainContainer.style.display = "block";
            footer.style.display = "block";

            document.body.style.overflow = "hidden";

        }

    }

    checkRoute();

    window.addEventListener("hashchange", checkRoute);

}
