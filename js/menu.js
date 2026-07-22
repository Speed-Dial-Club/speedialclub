function initMenu() {

    window.toggleMenu = function () {

        const panel = document.getElementById("contactPanel");
        const overlay = document.getElementById("menuOverlay");
        const btn = document.querySelector(".menu-btn");

        panel.classList.toggle("open");
        overlay.classList.toggle("open");
        btn.classList.toggle("active");

    };

}
