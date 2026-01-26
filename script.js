document.addEventListener("DOMContentLoaded", () => {

const SUPABASE_URL = "https://thlhymoqiiohoosxngjg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobGh5bW9xaWlvaG9vc3huZ2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTI5NzUsImV4cCI6MjA4NDk4ODk3NX0.cqyxKvGKrfJrfbAh_yx0AygHynwWSVaZa1kg713ZdJg";

const overlay = document.getElementById("overlay");
const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const visitorText = document.getElementById("visitorCount");

async function updateVisitors() {
  try {
    const resGet = await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1&select=count`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    const data = await resGet.json();
    let count = data[0].count;
    count++;

    await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({ count })
    });

    visitorText.innerText = count;
  } catch (e) {
    console.error(e);
    visitorText.innerText = "error";
  }
}

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  if (clickSound) clickSound.play().catch(()=>{});
  if (bgMusic) bgMusic.play().catch(()=>{});
  updateVisitors();
});

});
