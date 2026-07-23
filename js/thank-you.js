document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("confetti-container");

    if (!container) return;

    const colors = [
        "#D60B2A",
        "#16a34a",
        "#2563eb",
        "#f59e0b",
        "#9333ea"
    ];

    for (let i = 0; i < 120; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "%";

        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (3 + Math.random() * 3) + "s";

        piece.style.animationDelay =
            (Math.random() * 2) + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        container.appendChild(piece);

    }

});
