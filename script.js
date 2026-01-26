const overlay = document.getElementById("overlay");
const container = document.querySelector(".container");
const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const visitorText = document.getElementById("visitorCount");

const SUPABASE_URL = "https://thlhymoqiiohoosxngjg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobGh5bW9xaWlvaG9vc3huZ2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTI5NzUsImV4cCI6MjA4NDk4ODk3NX0.cqyxKvGKrfJrfbAh_yx0AygHynwWSVaZa1kg713ZdJg";

async function updateVisitors() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1&select=count`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    const data = await res.json();
    let count = data[0].count + 1;

    await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ count })
    });

    visitorText.textContent = count;
  } catch {
    visitorText.textContent = "error";
  }
}

overlay.onclick = () => {
  overlay.style.display = "none";
  container.style.display = "block";

  clickSound.play().catch(()=>{});
  bgMusic.play().catch(()=>{});

  updateVisitors();
};
