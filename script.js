const overlay = document.getElementById("overlay");
const container = document.querySelector(".container");
const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const visitorText = document.getElementById("visitorCount");
const themeBtn = document.getElementById("themeBtn");
const muteBtn = document.getElementById("muteBtn");
const typewriterElement = document.getElementById("typewriter");
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");

const SUPABASE_URL = "https://thlhymoqiiohoosxngjg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobGh5bW9xaWlvaG9vc3huZ2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTI5NzUsImV4cCI6MjA4NDk4ODk3NX0.cqyxKvGKrfJrfbAh_yx0AygHynwWSVaZa1kg713ZdJg";

// İMLEÇ TAKİBİ
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px";
    cursorBlur.style.left = e.clientX + "px"; cursorBlur.style.top = e.clientY + "px";
});

// TYPEWRITER
const texts = ["Sessiz yollarda, kendi ritmimde...", "Her yeni gün, yeni bir hikaye.", "Karanlık çöker, ama ışık bitmez.", "Razdal Real - Road to 2026"];
let textIndex = 0, charIndex = 0, isDeleting = false;
function type() {
    const currentText = texts[textIndex];
    typewriterElement.textContent = isDeleting ? currentText.substring(0, charIndex - 1) : currentText.substring(0, charIndex + 1);
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentText.length) { isDeleting = true; speed = 2000; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; speed = 500; }
    setTimeout(type, speed);
}

// SES FADE SİSTEMİ
let isMuted = false;
muteBtn.onclick = () => {
    if (!isMuted) {
        fadeAudio(0); // Sesi kapat (Fade Out)
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        fadeAudio(0.5); // Sesi aç (Fade In)
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    isMuted = !isMuted;
};

function fadeAudio(targetVolume) {
    let step = 0.05;
    let interval = setInterval(() => {
        if (bgMusic.volume < targetVolume) {
            bgMusic.volume = Math.min(bgMusic.volume + step, targetVolume);
        } else {
            bgMusic.volume = Math.max(bgMusic.volume - step, targetVolume);
        }
        if (bgMusic.volume.toFixed(2) == targetVolume.toFixed(2)) clearInterval(interval);
    }, 50);
}

// GİRİŞ VE SAYAÇ
overlay.onclick = () => {
    clickSound.play().catch(() => {});
    bgMusic.volume = 0; // Sıfırdan başlasın
    bgMusic.play().catch(() => {});
    fadeAudio(0.5); // Girişte yavaşça açılsın
    overlay.classList.add("hidden");
    container.classList.add("active");
    type();
    // updateVisitors() fonksiyonunu buraya ekleyebilirsin
};

themeBtn.onclick = () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
    themeBtn.textContent = document.body.classList.contains("light-theme") ? "🌙" : "☀️";
};
