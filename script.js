// Sayfada herhangi bir yere tıklandığında müziği başlatır
window.onclick = function() {
    var audio = document.getElementById("bgMusic");
    if (audio) {
        audio.play().catch(function(error) {
            console.log("Müzik çalma hatası:", error);
        });
    }
}
