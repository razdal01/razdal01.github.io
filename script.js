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

// VISITOR COUNTER (COUNTAPI)
const namespace = "razdal01-github";
const key = "visitors";

fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("visitorCount").innerText = data.value;
    })
    .catch(err => {
        console.error(err);
        document.getElementById("visitorCount").innerText = "0";
    });

