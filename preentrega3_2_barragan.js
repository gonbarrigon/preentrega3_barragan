//Mostrar el carrito y el total en la pagina de pago - recuperar del storage el listado de productos y solo dejar los que tienen cantidad mayor a cero
let recuperar_productos = localStorage.getItem("carrito");
recuperar_productos = JSON.parse(recuperar_productos);
let recuperar_total = parseInt(localStorage.getItem("total"));

let contenido_carrito = document.getElementById("contenido_carrito");
    contenido_carrito.innerHTML = ``;
    for(let item_carrito of recuperar_productos){
        if(item_carrito.cantidad > 0){
            let producto_agregado = document.createElement("tr");
            producto_agregado.innerHTML = `<td><img src="${item_carrito.ruta}" style="height: 50px" class="align-middle"></td>
                                            <td class="align-middle">${item_carrito.nombre}</td>
                                            <td class="align-middle">${item_carrito.cantidad}</td>
                                            <td class="align-middle">$${item_carrito.cantidad * item_carrito.precio}</td>`;
            contenido_carrito.append(producto_agregado);
        }
    }

 //Muestra el total de la compra
let total_carrito = document.getElementById("total_carrito");
total_carrito.innerHTML = `<p class="total-carrito">Total: $${recuperar_total}</p>`;

 //Generar las opciones de pago para el desplegable <select>
let pagos = document.getElementById("pagos");
pagos.innerHTML =  `<option value="1">1 pago de $${recuperar_total.toFixed(2)}</option>
                        <option value="3">3 pagos de $${(recuperar_total * 1.05 / 3).toFixed(2)} (5% de regargo)</option>
                        <option value="6">6 pagos de $${(recuperar_total * 1.1 / 6).toFixed(2)} (10% de regargo)</option>
                        <option value="12">12 pagos de $${(recuperar_total * 1.15/ 12).toFixed(2)} (15% de regargo)</option>`

//Al hacer click, guardar el nombre y el mail para la confirmación.
let btn_pagar = document.getElementById("btn_pagar");

btn_pagar.addEventListener("click", function(){
    let nombre = document.getElementById("nombre").value;
    localStorage.setItem("nombre", nombre);
    let mail = document.getElementById("mail").value;
    localStorage.setItem("mail", mail);    
})

