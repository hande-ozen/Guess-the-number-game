// Containerlar
const basla = document.getElementById("baslaEkran");
const hazir = document.getElementById("oyunHazirEkran");
const info = document.getElementById("infoEkran");
const oyun = document.getElementById("oyunEkran");

// Inputlar
const tahminInput = document.getElementById("tahminInp");

// Butonlar
const oyunaBaslaBtn = document.getElementById("oyunaBaslaBtn");
const oyunaHazirBtn = document.getElementById("oyunaHazirBtn");
const tahminButonu = document.getElementById("tahminEtBtn");

// Game Logic (Oyun mantigi)
const MAX = 50;
let randomSayi = Math.floor((Math.random() * MAX) + 1);
console.log("Random: " + randomSayi);

// =================================== LET'S GO! ======================================


tahminInput.oninput = inputSayiSinirla;

oyunaBaslaBtn.onclick = oyunaBasla;
oyunaHazirBtn.onclick = oyunaHazir;
tahminButonu.onclick = tahminKontrol;



// ================================ FUNCTIONS =========================================


function oyunaBasla() {
    basla.classList.add("gizle");
    hazir.classList.remove("gizle");

    // infoyu göster
    info.classList.remove("gizle");

    // infoyu 1,5 sn sonra gizle
    setTimeout(() => {
        info.classList.add("gizle");
    }, 1500);
}

function oyunaHazir() {
    hazir.classList.add("gizle");
    oyun.classList.remove("gizle");
}

function inputSayiSinirla() {
    if (tahminInput.value > MAX) {
        tahminInput.value = MAX;
    } else if (tahminInput.value < 1) {
        tahminInput.value = 1;
    }
}

function tahminKontrol() {
    const fark = Math.abs(randomSayi - tahminInput.value);
    const farkYuzdelik = (fark / MAX * 100);

    if (tahminInput.value > randomSayi) {
        console.log("uctun uctun düs biraz");
    } else if (tahminInput.value < randomSayi) {
        console.log("yerlerdesin, yükselt biraz");
    } else if (tahminInput.value == randomSayi) {
        console.log("AFERIN!");
    }
}