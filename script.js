const overlay = document.getElementById("overlay");
const container = document.querySelector(".container");
const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const visitorText = document.getElementById("visitorCount");
const themeBtn = document.getElementById("themeBtn");
const typewriterElement = document.getElementById("typewriter");

const SUPABASE_URL = "https://thlhymoqiiohoosxngjg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobGh5bW9xaWlvaG9vc3huZ2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTI5NzUsImV4cCI6MjA4NDk4ODk3NX0.cqyxKvGKrfJrfbAh_yx0AygHynwWSVaZa1kg713ZdJg";

// --- SENİN YAZILARIN BURAYA ---
const texts = [
    "Nööööörsekkii laaaaaaaaaa",
    "İyiyim ya işte",
    "Bu aralar daha iyiyim hatta",
    "Sıkkınım biraz da",
    "Bojver doztum sen gendi hayatına bağ",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // Cümle bittikten sonra 2 saniye bekle
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Sayaç
async function updateVisitors() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1&select=count`, {
            headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        });
        const data = await res.json();
        let count = data[0].count + 1;
        await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1`, {
            method: "PATCH",
            headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ count })
        });
        visitorText.textContent = count;
    } catch { visitorText.textContent = "error"; }
}

overlay.onclick = () => {
    clickSound.play().catch(() => {});
    bgMusic.volume = 0.5;
    bgMusic.play().catch(() => {});
    overlay.classList.add("hidden");
    container.classList.add("active");
    updateVisitors();
    type(); // Efekti başlat
};

themeBtn.onclick = () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
    themeBtn.textContent = document.body.classList.contains("light-theme") ? "🌙" : "☀️";
};
