window.onclick = function() {
    var audio = document.getElementById("bgMusic");
    if (audio) {
        audio.play().catch(function(e) { console.log("Hata:", e); });
    }
}
