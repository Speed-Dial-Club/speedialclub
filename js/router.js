function initRouter() {

    const mainContainer = document.querySelector(".container");
    const footer = document.querySelector(".footer");

    const routes = {
        "#ipl-tickets": document.getElementById("iplPage"),
        "#creator-payout-portal": document.getElementById("creatorPage"),
        "#thank-you": document.getElementById("thankYouPage")
    };

    function checkRoute() {

        Object.values(routes).forEach(page => {
            if (page) {
                page.classList.remove("active");
            }
        });

        if (routes[window.location.hash]) {

            mainContainer.style.display = "none";
            footer.style.display = "none";

            routes[window.location.hash].classList.add("active");

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
