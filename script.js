const SUPABASE_URL = "https://thlhymoqiiohoosxngjg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobGh5bW9xaWlvaG9vc3huZ2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTI5NzUsImV4cCI6MjA4NDk4ODk3NX0.cqyxKvGKrfJrfbAh_yx0AygHynwWSVaZa1kg713ZdJg";

async function updateVisitors() {
  // mevcut sayıyı al
  const getRes = await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1&select=count`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  const data = await getRes.json();
  let count = data[0].count;

  // +1 yap
  count++;

  // güncelle
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

  // ekrana yaz
  document.getElementById("visitorCount").innerText = count;
}

updateVisitors();
