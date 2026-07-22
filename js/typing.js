function initTyping() {

const message = "Dialing Soon.....";

const typingSpeed = 90;
const deletingSpeed = 50;

const pauseAfterTyping = 1000;
const pauseAfterDeleting = 1000;

let i = 0;
let isDeleting = false;

function initTyping() {

    const target = document.getElementById("text");

    function typeLoop() {

        if (!isDeleting) {

            target.textContent = message.substring(0, i + 1);
            i++;

            if (i === message.length) {
                isDeleting = true;
                setTimeout(typeLoop, pauseAfterTyping);
                return;
            }

        } else {

            target.textContent = message.substring(0, i - 1);
            i--;

            if (i === 0) {
                isDeleting = false;
                setTimeout(typeLoop, pauseAfterDeleting);
                return;
            }

        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeLoop, speed);

    }

    setTimeout(typeLoop, 700);

}

}
