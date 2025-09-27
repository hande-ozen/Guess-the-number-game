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

// Labellar
const bildiri = document.getElementById("bildiri");

// Game Logic (Oyun mantigi)
const MAX = 50;
let randomSayi = Math.floor((Math.random() * MAX) + 1);
console.log("Random: " + randomSayi);

// =================================== LET'S GO! ======================================

tahminInput.oninput = inputSayiSinirla;
tahminInput.onkeydown = inputTusKontrol;

const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["heart"],
    colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
};

confetti({
    ...defaults,
    particleCount: 50,
    scalar: 2,
});

confetti({
    ...defaults,
    particleCount: 25,
    scalar: 3,
});

confetti({
    ...defaults,
    particleCount: 10,
    scalar: 4,
});

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
    }, 1000);
}

function oyunaHazir() {
    hazir.classList.add("gizle");
    oyun.classList.remove("gizle");
}

function inputSayiSinirla() {
    if (tahminInput.value > MAX) {
        tahminInput.value = MAX;

    } else if (tahminInput.value < 1) {
        if (tahminInput.value != "") {
            tahminInput.value = 1;
        }
    }
}

function inputTusKontrol(hangiTus) {
    if (hangiTus.key == "Enter") {
        tahminKontrol()
    }
}

function bildiriRenkVer(hangiRenk) {
    bildiri.classList.remove("purple");
    bildiri.classList.remove("red");
    bildiri.classList.remove("orange");
    bildiri.classList.remove("green");
    bildiri.classList.remove("blue");
    bildiri.classList.add(hangiRenk);
}

function tahminKontrol() {
    const fark = Math.abs(randomSayi - tahminInput.value);
    const farkYuzdelik = (fark / MAX * 100);

    if (tahminInput.value > randomSayi) {
        if (farkYuzdelik > 20) {
            bildiriRenkVer("blue");
            bildiri.textContent = "Sayiniz Cok Fazla Büyük ❄️";
        } else {
            bildiriRenkVer("purple");
            bildiri.textContent = "Sayiniz Büyük Ama Yakin 🍀";
        }
    } else if (tahminInput.value < randomSayi) {
        if (farkYuzdelik > 20) {
            bildiriRenkVer("red");
            bildiri.textContent = "Sayiniz Cok Fazla Kücük ❄️";
        } else {
            bildiriRenkVer("orange");
            bildiri.textContent = "Sayiniz Kücük Ama Yakin 🍀";
        }

    } else if (tahminInput.value == randomSayi) {
        bildiriRenkVer("green");
        const duration = 3 * 1000,
            animationEnd = Date.now() + duration,
            defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // since particles fall down, start a bit higher than random
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                })
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                })
            );
        }, 250);
        bildiri.textContent = "❤️🎉 Tebrikler Dogru Bildiniz ❤️🎉";
    }

    // input yazisini sec ki silmeye gerek kalmadan direkt yazilabilsin
    tahminInput.select();
}
