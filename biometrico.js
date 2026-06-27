const pad = document.getElementById("pad");
const dots = [...document.querySelectorAll("#dots span")];
const msg = document.getElementById("message");

let code = "";

["1","2","3","4","5","6","7","8","9","⌫","0","✓"].forEach(k=>{

    const b=document.createElement("button");
    b.textContent=k;

    b.onclick=async ()=>{

        if(k==="⌫"){

            code=code.slice(0,-1);

        }

        else if(k==="✓"){

            if(code.length!==4){

                msg.textContent="Ingresa un código de 4 dígitos";
                return;

            }

            msg.textContent="Verificando...";

            try{

                const r=await fetch(
                    "https://move-access.movedancea.workers.dev",
                    {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            codigo:code
                        })
                    }
                );

                const data=await r.json();

                if(data.success){

                    msg.innerHTML=`✅ Bienvenida<br><strong>${data.nombre}</strong>`;

                    if(data.foto && data.foto.length){

                        document.getElementById("photo").src=data.foto[0].url;
                        document.getElementById("photoContainer").style.display="block";

                    }

                    setTimeout(()=>{

                        location.href="index.html";

                    },5000);

                }else{

                    msg.textContent="❌ Código no encontrado";

                    code="";
                    dots.forEach(d=>d.classList.remove("fill"));

                }

            }catch(e){

                console.error(e);

                msg.textContent="Error de conexión";

            }

            return;

        }

        else{

            if(code.length<4){

                code+=k;

            }

        }

        dots.forEach((d,i)=>{

            d.classList.toggle("fill",i<code.length);

        });

    };

    pad.appendChild(b);

});
