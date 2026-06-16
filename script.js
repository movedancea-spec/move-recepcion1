/* ===========================================
   MOVE DANCE ACADEMY
   Premium Reception
=========================================== */

/* ---------- MENSAJES ---------- */

const messages = [

    "✨ ¡Bienvenidos a MOVE! ✨",

    "💖 Que tengas una excelente clase 💖",

    "🩰 Hoy será un gran día para bailar 🩰",

    "🌸 Gracias por ser parte de MOVE 🌸",

    "💃 Disfruta cada paso 💃",

    "🩷 Nunca dejes de bailar 🩷",

    "⭐ Cree en ti y alcanza tus sueños ⭐",

    "🎀 Todo gran bailarín comenzó con un primer paso 🎀"

];


/* ---------- MENSAJE ROTATIVO ---------- */

let currentMessage = 0;

const welcome = document.getElementById("welcomeMessage");

function changeMessage() {

    if (!welcome) return;

    welcome.style.opacity = 0;

    setTimeout(() => {

        currentMessage++;

        if (currentMessage >= messages.length) {

            currentMessage = 0;

        }

        welcome.innerHTML = messages[currentMessage];

        welcome.style.opacity = 1;

    }, 400);

}

setInterval(changeMessage, 5000);


/* ---------- RELOJ ---------- */

const clock = document.getElementById("clock");

const dateLabel = document.getElementById("date");

const greeting = document.getElementById("greeting");


function updateClock() {

    const now = new Date();

    /* Hora */

    const time = now.toLocaleTimeString("es-GT", {

        hour: "2-digit",

        minute: "2-digit"

    });

    if (clock) {

        clock.innerHTML = time;

    }

    /* Fecha */

    const date = now.toLocaleDateString("es-GT", {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    });

    if (dateLabel) {

        dateLabel.innerHTML =
            date.charAt(0).toUpperCase() +
            date.slice(1);

    }

    /* Saludo */

    const hour = now.getHours();

    let text = "";

    if (hour < 12) {

        text = "☀️ Buenos días";

    }

    else if (hour < 18) {

        text = "🌤️ Buenas tardes";

    }

    else {

        text = "🌙 Buenas noches";

    }

    if (greeting) {

        greeting.innerHTML = text;

    }

}

updateClock();

setInterval(updateClock, 1000);


/* ---------- EFECTO BOTONES ---------- */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {

    btn.addEventListener("touchstart", () => {

        btn.style.transform = "scale(.96)";

    });

    btn.addEventListener("touchend", () => {

        btn.style.transform = "";

    });

    btn.addEventListener("mousedown", () => {

        btn.style.transform = "scale(.96)";

    });

    btn.addEventListener("mouseup", () => {

        btn.style.transform = "";

    });

});


/* ---------- ANIMACIÓN SUAVE MENSAJES ---------- */

if (welcome) {

    welcome.style.transition = "opacity .4s ease";

}


/* ---------- EFECTO ENTRADA ---------- */

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    document.body.style.transition = "opacity .8s";

    setTimeout(() => {

        document.body.style.opacity = "1";

    }, 100);

});
