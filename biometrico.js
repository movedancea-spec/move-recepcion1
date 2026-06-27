const WORKER_URL="https://move-access.movedancea.workers.dev";

const pad=document.getElementById("pad");
const dots=document.getElementById("dots");
const msg=document.getElementById("message");
const studentName=document.getElementById("studentName");
const photo=document.getElementById("photo");
const photoContainer=document.getElementById("photoContainer");
const greeting=document.getElementById("greeting");
const clock=document.getElementById("clock");
const registerTime=document.getElementById("registerTime");
const birthday=document.getElementById("birthday");

let codigo="";

["1","2","3","4","5","6","7","8","9","⌫","0","✓"].forEach(t=>{
 const b=document.createElement("button");
 b.textContent=t;
 b.onclick=()=>presionar(t);
 pad.appendChild(b);
});

function actualizarHora(){
 const now=new Date();
 clock.textContent=now.toLocaleTimeString("es-GT",{hour:"2-digit",minute:"2-digit"});
 const h=now.getHours();
 greeting.textContent=h<12?"☀️ Buenos días":h<18?"🌤️ Buenas tardes":"🌙 Buenas noches";
}
setInterval(actualizarHora,1000);
actualizarHora();

function actualizarDots(){
 dots.innerHTML="";
 for(let i=0;i<4;i++){
   const s=document.createElement("span");
   if(i<codigo.length)s.classList.add("fill");
   dots.appendChild(s);
 }
}

async function presionar(t){
 if(t==="⌫"){codigo=codigo.slice(0,-1);actualizarDots();return;}
 if(t==="✓"){
   if(!codigo){msg.textContent="Ingresa un código";return;}
   return buscar();
 }
 if(codigo.length<6){codigo+=t;actualizarDots();}
}

async function buscar(){
 msg.textContent="Verificando...";
 try{
   const r=await fetch(WORKER_URL,{
     method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify({codigo})
   });
   const data=await r.json();
   if(!data.success){
      limpiar();
      msg.textContent="Código no encontrado";
      return;
   }
   studentName.textContent=data.nombre||"Bienvenida";
   msg.textContent="Asistencia registrada correctamente";
   if(data.foto&&data.foto.length){
      photo.src=data.foto[0].url;
      photoContainer.style.display="flex";
   }
   registerTime.textContent="Registrado: "+new Date().toLocaleTimeString("es-GT",{hour:"2-digit",minute:"2-digit"});
   if(data.cumpleHoy){birthday.textContent="🎂 ¡Feliz cumpleaños!";}
   codigo="";
   actualizarDots();
   setTimeout(()=>location.href="index.html",9000);
 }catch(e){
   limpiar();
   msg.textContent="Error de conexión";
 }
}

function limpiar(){
 codigo="";
 actualizarDots();
 photoContainer.style.display="none";
 studentName.textContent="";
 registerTime.textContent="";
 birthday.textContent="";
}
actualizarDots();
