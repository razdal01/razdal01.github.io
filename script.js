const overlay = document.getElementById("overlay"), container = document.querySelector(".container"),
      bgMusic = document.getElementById("bgMusic"), clickSound = document.getElementById("clickSound"),
      visitorText = document.getElementById("visitorCount"), themeBtn = document.getElementById("themeBtn"),
      muteBtn = document.getElementById("muteBtn"), typewriterElement = document.getElementById("typewriter"),
      cursor = document.getElementById("cursor"), cursorBlur = document.getElementById("cursor-blur");

const SUPABASE_URL = "https://thlhymoqiiohoosxngjg.supabase.co",
      SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobGh5bW9xaWlvaG9vc3huZ2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTI5NzUsImV4cCI6MjA4NDk4ODk3NX0.cqyxKvGKrfJrfbAh_yx0AygHynwWSVaZa1kg713ZdJg";

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px";
    cursorBlur.style.left = e.clientX + "px"; cursorBlur.style.top = e.clientY + "px";
});

const texts = ["Domo toranaga makarameso anjinsen hayt","Demeyi unuttum da aşağıdakilerden bana ulasabilirsin!","İyiyim","Sansar dinliyorum artık sen düşün",":D",".d"]
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

let isMuted = false;
function fadeAudio(targetVolume) {
    let step = 0.05;
    let interval = setInterval(() => {
        if (bgMusic.volume < targetVolume) bgMusic.volume = Math.min(bgMusic.volume + step, targetVolume);
        else bgMusic.volume = Math.max(bgMusic.volume - step, targetVolume);
        if (bgMusic.volume.toFixed(2) == targetVolume.toFixed(2)) clearInterval(interval);
    }, 50);
}

muteBtn.onclick = () => {
    isMuted = !isMuted; fadeAudio(isMuted ? 0 : 0.5);
    muteBtn.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
};

async function updateVisitors() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1`, { headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` } });
        const data = await res.json();
        if (data.length > 0) {
            let newCount = data[0].count + 1;
            await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1`, {
                method: "PATCH", headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
                body: JSON.stringify({ count: newCount })
            });
            visitorText.textContent = newCount;
        }
    } catch { visitorText.textContent = "err"; }
}

overlay.onclick = () => {
    clickSound.play().catch(() => {});
    bgMusic.volume = 0; bgMusic.play().catch(() => {});
    fadeAudio(0.5); overlay.classList.add("hidden"); container.classList.add("active");
    type(); updateVisitors();
};

themeBtn.onclick = () => {
    document.body.classList.toggle("light-theme"); document.body.classList.toggle("dark-theme");
    themeBtn.textContent = document.body.classList.contains("light-theme") ? "🌙" : "☀️";
};
