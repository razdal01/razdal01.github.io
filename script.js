document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    console.log("overlay kapandı");
  });
});
