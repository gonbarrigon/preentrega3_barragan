let recuperar_nombre = localStorage.getItem("nombre");
let recuperar_mail = localStorage.getItem("mail");

let msj_confirmacion = document.getElementById("msj-confirmacion");
msj_confirmacion.innerHTML = `<h1 class="titulo">¡Su compra está confirmada!</h1>
                                <h5>¡Gracias ${recuperar_nombre} por elegirnos!</h5>
                                <p>Pronto recibirás la factura y las instrucciones de retiro en tu correo: ${recuperar_mail}</p>
                                <button class="btn btn-outline-primary"><a href="preentrega3_barragan.html" style="color: black">Volver</a></button>`
