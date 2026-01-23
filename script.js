const overlay = document.getElementById("overlay");
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");

// CLICK TO VIEW
overlay.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();

    bgMusic.volume = 0.6;
    bgMusic.play();

    overlay.classList.add("hide");
});

// VISITOR COUNTER
fetch("https://api.countapi.xyz/hit/razdal01-profile/visits")
    .then(res => res.json())
    .then(data => {
        document.getElementById("visitorCount").innerText = data.value;
    })
    .catch(() => {
        document.getElementById("visitorCount").innerText = "-";
    });
