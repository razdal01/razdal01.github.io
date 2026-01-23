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

/* TYPING BIO */
const texts = [
    "Hardcore Gamer",
    "Night Drive Lover",
    "Minimal. Calm. Focused."
];

let i = 0, j = 0, deleting = false;
const el = document.getElementById("typingText");

function type() {
    if (!deleting && j <= texts[i].length) {
        el.textContent = texts[i].slice(0, j++);
    } else if (deleting && j > 0) {
        el.textContent = texts[i].slice(0, j--);
    } else {
        deleting = !deleting;
        if (!deleting) i = (i + 1) % texts.length;
    }
    setTimeout(type, deleting ? 50 : 100);
}
type();

/* FAKE SPOTIFY */
const songs = ["Night Drive", "After Midnight", "Silent Roads"];
document.getElementById("songName").textContent =
    songs[Math.floor(Math.random() * songs.length)];
