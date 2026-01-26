import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://thlhymoqiiohoosxngjg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobGh5bW9xaWlvaG9vc3huZ2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTI5NzUsImV4cCI6MjA4NDk4ODk3NX0.cqyxKvGKrfJrfbAh_yx0AygHynwWSVaZa1kg713ZdJg";

const supabase = createClient(supabaseUrl, supabaseKey);

const overlay = document.getElementById("overlay");
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");
const counter = document.getElementById("visitorCount");

overlay.addEventListener("click", async () => {
  overlay.style.display = "none";
  clickSound.play();
  bgMusic.play();

  await supabase.rpc("increment_visits");

  const { data, error } = await supabase
    .from("visitors")
    .select("count")
    .eq("id", 1)
    .single();

  if (!error) {
    counter.innerText = data.count;
  } else {
    counter.innerText = "error";
  }
});
