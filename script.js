const overlay = document.getElementById("clickOverlay");
const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");

/* CLICK TO VIEW */
overlay.addEventListener("click", () => {
    clickSound.play().catch(()=>{});
    bgMusic.volume = 0.6;
    bgMusic.play().catch(()=>{});
    overlay.classList.add("hide");
});

/* TYPING TEXT */
const texts = [
    "Hardcore Gamer",
    "Duelist",
    "Content Creator",
    "Developer"
];

let i = 0, j = 0, deleting = false;
const typingEl = document.getElementById("typingText");

function type() {
    if (!deleting && j <= texts[i].length) {
        typingEl.textContent = texts[i].slice(0, j++);
    } else if (deleting && j > 0) {
        typingEl.textContent = texts[i].slice(0, j--);
    } else {
        deleting = !deleting;
        if (!deleting) i = (i + 1) % texts.length;
    }
    setTimeout(type, deleting ? 50 : 100);
}
type();

/* FAKE SPOTIFY */
const songs = [
    "Silent Mode",
    "Dark Vibes",
    "Night Drive",
    "Glitch Core"
];

document.getElementById("songName").textContent =
    songs[Math.floor(Math.random() * songs.length)];
