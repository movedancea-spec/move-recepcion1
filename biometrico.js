const pad = document.getElementById("pad");
const dots = document.getElementById("dots");
const msg = document.getElementById("message");
const photo = document.getElementById("photo");
const photoContainer = document.getElementById("photoContainer");

let codigo = "";

// URL de tu Worker
const WORKER_URL = "https://move-access.movedancea.workers.dev";

// Teclado
const teclas = [
    "1","2","3",
    "4","5","6",
    "7","8","9",
    "⌫","0","✓"
];

teclas.forEach(tecla=>{

    const boton = document.createElement("button");
    boton.textContent = tecla;

    boton.addEventListener("click",()=>{

        presionar(tecla);

    });

    pad.appendChild(boton);

});

function actualizarPuntos(){

    dots.innerHTML="";

    for(let i=0;i<codigo.length;i++){

        const punto=document.createElement("span");
        punto.classList.add("fill");

        dots.appendChild(punto);

    }

    for(let i=codigo.length;i<4;i++){

        dots.innerHTML += "<span></span>";

    }

}

async function presionar(tecla){

    if(tecla==="⌫"){

        codigo=codigo.slice(0,-1);

        actualizarPuntos();

        return;

    }

    if(tecla==="✓"){

        if(codigo.length===0){

            mostrarError("Ingresa un código");

            return;

        }

        buscarCodigo();

        return;

    }

    if(codigo.length>=6){

        return;

    }

    codigo+=tecla;

    actualizarPuntos();

}

async function buscarCodigo(){

    try{

        msg.innerHTML="⏳ Verificando...";

        const respuesta = await fetch(WORKER_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                codigo:codigo

            })

        });

        const datos = await respuesta.json();

        console.log(datos);

        if(!datos.success){

            mostrarError("❌ Código no encontrado");

            return;

        }

        mostrarBienvenida(datos);

    }

    catch(error){

        console.error(error);

        mostrarError("⚠ Error de conexión");

    }

}

function mostrarBienvenida(datos){

    if(datos.foto && datos.foto.length){

        photo.src = datos.foto[0].url;

        photoContainer.style.display="block";

    }

    msg.innerHTML=`

        <h2>✅ Bienvenida</h2>

        <h1>${datos.nombre}</h1>

        <p>Asistencia registrada correctamente.</p>

    `;

    codigo="";

    actualizarPuntos();

    setTimeout(()=>{

        location.href="index.html";

    },5000);

}

function mostrarError(texto){

    msg.innerHTML=texto;

    codigo="";

    actualizarPuntos();

    photoContainer.style.display="none";

}
