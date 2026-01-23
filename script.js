const overlay = document.getElementById("overlay");
const card = document.getElementById("card");
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");

overlay.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();

    bgMusic.volume = 0.6;
    bgMusic.play().catch(() => {});

    overlay.style.opacity = "0";

    setTimeout(() => {
        overlay.style.display = "none";
        card.classList.add("show");
    }, 400);
});
