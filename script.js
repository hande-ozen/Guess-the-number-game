// Containerlar
const basla = document.getElementById("baslaEkran");
const hazir = document.getElementById("oyunHazirEkran");
const popup = document.getElementById("popupEkran");
const oyun = document.getElementById("oyunEkran");

// Inputlar
const tahminInput = document.getElementById("tahminInp");

// Butonlar
const oyunaBaslaBtn = document.getElementById("oyunaBaslaBtn");
const oyunaHazirBtn = document.getElementById("oyunaHazirBtn");
const tahminButonu = document.getElementById("tahminEtBtn");

// Labellar
const resultMessage = document.getElementById("resultMessage");

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
    basla.classList.add("hidden");
    hazir.classList.remove("hidden");

    popup.classList.remove("hidden");

    setTimeout(() => {
        popup.classList.add("hidden");
    }, 5000);
}

function oyunaHazir() {
    hazir.classList.add("hidden");
    oyun.classList.remove("hidden");
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

function resultMessageRenkVer(hangiRenk) {
    resultMessage.classList.remove("purple");
    resultMessage.classList.remove("red");
    resultMessage.classList.remove("orange");
    resultMessage.classList.remove("green");
    resultMessage.classList.remove("blue");
    resultMessage.classList.add(hangiRenk);
}

function tahminKontrol() {
    const fark = Math.abs(randomSayi - tahminInput.value);
    const farkYuzdelik = (fark / MAX * 100);

    if (tahminInput.value > randomSayi) {
        if (farkYuzdelik > 20) {
            resultMessageRenkVer("blue");
            resultMessage.textContent = "Sayiniz Cok Fazla Büyük ❄️";
        } else {
            resultMessageRenkVer("purple");
            resultMessage.textContent = "Sayiniz Büyük Ama Yakin 🍀";
        }
    } else if (tahminInput.value < randomSayi) {
        if (farkYuzdelik > 20) {
            resultMessageRenkVer("red");
            resultMessage.textContent = "Sayiniz Cok Fazla Kücük ❄️";
        } else {
            resultMessageRenkVer("orange");
            resultMessage.textContent = "Sayiniz Kücük Ama Yakin 🍀";
        }

    } else if (tahminInput.value == randomSayi) {
        resultMessageRenkVer("green");
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
        resultMessage.textContent = "🎉❤️ Tebrikler Dogru Bildiniz ❤️🎉";
    }

    tahminInput.select();
}
