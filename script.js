const words = ["Developer", "Gamer", "Designer", "Student"];
let i = 0, j = 0, currentWord = "", isDeleting = false;

function type() {
    currentWord = words[i];
    if (isDeleting) {
        document.getElementById("text").textContent = currentWord.substring(0, j - 1);
        j--;
        if (j == 0) { isDeleting = false; i = (i + 1) % words.length; }
    } else {
        document.getElementById("text").textContent = currentWord.substring(0, j + 1);
        j++;
        if (j == currentWord.length) { isDeleting = true; setTimeout(type, 2000); return; }
    }
    setTimeout(type, isDeleting ? 100 : 200);
}

var audio = document.getElementById("myAudio");
function baslat() {
    audio.play();
    document.getElementById("overlay").style.opacity = "0";
    setTimeout(() => { document.getElementById("overlay").style.display = "none"; }, 1500);
    type();
}

function sesiAc() { if(audio.volume < 1) { audio.volume = Math.min(1, audio.volume + 0.1); guncelle(); } }
function sesiKis() { if(audio.volume > 0) { audio.volume = Math.max(0, audio.volume - 0.1); guncelle(); } }
function guncelle() { document.getElementById("vol").innerText = Math.round(audio.volume * 100); }
