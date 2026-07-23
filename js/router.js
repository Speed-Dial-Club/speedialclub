function initRouter() {

    const pages = document.querySelectorAll(".page");
    const mainContainer = document.querySelector(".container");
    const footer = document.querySelector(".footer");

    function checkRoute() {

    const route = window.location.hash.replace("#", "");

    const page = document.querySelector(
        `.page[data-route="${route}"]`
    );

    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });

    if (page) {

        mainContainer.style.display = "none";
        footer.style.display = "none";

        page.classList.add("active");

        window.scrollTo(0, 0);

        document.body.style.overflow = "auto";

    } else {

        mainContainer.style.display = "block";
        footer.style.display = "block";

        window.scrollTo(0, 0);

        document.body.style.overflow = "auto";

    }

}

    checkRoute();

    window.addEventListener("hashchange", checkRoute);

}
