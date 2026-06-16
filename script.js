/* ======================================
   MOVE DANCE ACADEMY
   RECEPCIÓN PREMIUM
====================================== */

/* MENSAJES PRINCIPALES */

const messages = [

    "✨ ¡Bienvenidos a MOVE! ✨",

    "💖 Que tengas una excelente clase 💖",

    "🩰 Hoy será un gran día para bailar 🩰",

    "🌸 Gracias por ser parte de MOVE 🌸",

    "💃 Disfruta cada paso 💃",

    "🩷 Nunca dejes de bailar 🩷"

];

/* FRASES INSPIRADORAS */

const quotes = [

    "💖 La disciplina supera al talento.",

    "🌸 Cree en ti.",

    "🩰 Nunca dejes de soñar.",

    "✨ Cada paso cuenta.",

    "⭐ El esfuerzo de hoy es el logro de mañana.",

    "💃 Haz lo que amas.",

    "🎀 Todo gran bailarín comenzó con un primer paso."

];

const welcomeMessage =
document.getElementById("welcomeMessage");

const quote =
document.getElementById("quote");

let messageIndex = 0;
let quoteIndex = 0;


/* MENSAJES ROTATIVOS */

function rotateMessages(){

    if(!welcomeMessage) return;

    welcomeMessage.style.opacity = 0;

    setTimeout(()=>{

        messageIndex++;

        if(messageIndex >= messages.length){

            messageIndex = 0;

        }

        welcomeMessage.innerHTML =
        messages[messageIndex];

        welcomeMessage.style.opacity = 1;

    },400);

}

setInterval(
    rotateMessages,
    5000
);


/* FRASES ROTATIVAS */

function rotateQuotes(){

    if(!quote) return;

    quote.style.opacity = 0;

    setTimeout(()=>{

        quoteIndex++;

        if(quoteIndex >= quotes.length){

            quoteIndex = 0;

        }

        quote.innerHTML =
        quotes[quoteIndex];

        quote.style.opacity = 1;

    },400);

}

setInterval(
    rotateQuotes,
    8000
);


/* RELOJ Y FECHA */

const clock =
document.getElementById("clock");

const dateElement =
document.getElementById("date");

const greeting =
document.getElementById("greeting");


function updateDateTime(){

    const now = new Date();

    const time =
    now.toLocaleTimeString(
        "es-GT",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );

    if(clock){

        clock.innerHTML = time;

    }

    const date =
    now.toLocaleDateString(
        "es-GT",
        {
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );

    if(dateElement){

        dateElement.innerHTML =
        date.charAt(0).toUpperCase() +
        date.slice(1);

    }

    const hour =
    now.getHours();

    let greetingText =
    "";

    if(hour < 12){

        greetingText =
        "☀️ Buenos días";

    }

    else if(hour < 18){

        greetingText =
        "🌤️ Buenas tardes";

    }

    else{

        greetingText =
        "🌙 Buenas noches";

    }

    if(greeting){

        greeting.innerHTML =
        greetingText;

    }

}

updateDateTime();

setInterval(
    updateDateTime,
    1000
);


/* ANIMACIÓN DE ENTRADA */

window.addEventListener(
    "load",
    ()=>{

        document.body.style.opacity =
        "0";

        document.body.style.transition =
        "opacity .8s ease";

        setTimeout(()=>{

            document.body.style.opacity =
            "1";

        },100);

    }
);
