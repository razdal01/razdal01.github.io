const overlay = document.getElementById("overlay");
const container = document.querySelector(".container");
const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const visitorText = document.getElementById("visitorCount");
const themeBtn = document.getElementById("themeBtn");
const typewriterElement = document.getElementById("typewriter");
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");

const SUPABASE_URL = "https://thlhymoqiiohoosxngjg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobGh5bW9xaWlvaG9vc3huZ2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTI5NzUsImV4cCI6MjA4NDk4ODk3NX0.cqyxKvGKrfJrfbAh_yx0AygHynwWSVaZa1kg713ZdJg";

// İMLEÇ HAREKETİ
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursorBlur.style.left = e.clientX + "px";
    cursorBlur.style.top = e.clientY + "px";
});

// TYPEWRITER YAZILARI
const texts = [
    "Sessiz yollarda, kendi ritmimde...",
    "Her yeni gün, yeni bir hikaye.",
    "Karanlık çöker, ama ışık bitmez.",
    "Razdal Real - Road to 2026"
];
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

// SAYAÇ & GİRİŞ
async function updateVisitors() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1&select=count`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
        const data = await res.json();
        let count = data[0].count + 1;
        await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1`, { method: "PATCH", headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ count }) });
        visitorText.textContent = count;
    } catch { visitorText.textContent = "error"; }
}

overlay.onclick = () => {
    clickSound.play().catch(() => {});
    bgMusic.volume = 0.5; bgMusic.play().catch(() => {});
    overlay.classList.add("hidden");
    container.classList.add("active");
    updateVisitors();
    type();
};

themeBtn.onclick = () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
    themeBtn.textContent = document.body.classList.contains("light-theme") ? "🌙" : "☀️";
};
