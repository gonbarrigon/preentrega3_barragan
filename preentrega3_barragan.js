let lista_productos = [];
let cantidad_total = 0;
let venta_total = 0;
let cantidad = 0;


//Clase para crear los Productos como OBJETOS
class Producto{
    constructor(nombre, ruta, ruta_b, precio, stock){
        this.nombre = nombre;
        this.ruta = ruta;
        this.ruta_b = ruta_b;
        this.precio = precio;
        this.stock = stock;
        this.cantidad = 0;
        this.monto = 0;
        this.cantidad_restart = this.stock;
    }

    product_added(cantidad){
        if(this.stock < cantidad){
            alert(`No hay stock suficiente de ${this.nombre}`);
        }
        else{
            this.cantidad = this.cantidad + cantidad;
            this.stock = this.stock - cantidad;
            //alert(`Se ha agregado ${this.nombre} al carrito!\nCantidad agregada: ${this.cantidad}\nStock remanente: ${this.stock}`);
            venta_total = lista_productos.reduce(calcular_monto_total, 0);
            cantidad_total = lista_productos.reduce(calcular_cantidad_total, 0);
            let carrito_pill = document.getElementById("carrito_pill");
            carrito_pill.innerText = `${cantidad_total}`;
            console.log(lista_productos);
        }
    }
}

//Declaro los productos como objetos y les hago push al ARRAY
let cesta_uno = new Producto("Cesta Tejido", "img/cesta_uno.JPG", "img/cesta_uno_b.JPG",1000, 5);
let cesta_dos = new Producto("Cesta Triángulos", "img/cesta_dos.JPG", "img/cesta_dos_b.JPG", 1200, 8);
let cojin_uno = new Producto("Cojín Floral", "img/cojin_uno.JPG", "img/cojin_uno_b.JPG", 1500, 3);
let cojin_dos = new Producto("Cojín Tejido", "img/cojin_dos.JPG", "img/cojin_dos_b.JPG", 1800, 4);
let espejo_uno = new Producto("Espejo Redondo","img/espejo_uno.JPG","img/espejo_uno_b.JPG", 2100, 4);
let espejo_dos = new Producto("Espejo Rectangular","img/espejo_dos.JPG","img/espejo_dos_b.JPG", 2100, 5);
let espejo_tres = new Producto("Espejo Colgante","img/espejo_tres.JPG","img/espejo_tres_b.JPG", 2100, 2);
let jarron_uno = new Producto("Jarrón Jackson","img/jarron_uno.JPG","img/jarron_uno_b.JPG", 2100, 5);
let jarron_dos = new Producto("Jarrón Botella","img/jarron_dos.JPG","img/jarron_dos_b.JPG", 2100, 3);
lista_productos.push(cesta_uno, cesta_dos, cojin_uno, cojin_dos, espejo_uno, espejo_dos, espejo_tres, jarron_uno, jarron_dos);

//Esta funcion borra todos los datos del carrito y vuelve todos los valores al inicio de la compra.
let btn_restart = document.getElementById("btn_restart");
btn_restart.addEventListener("click", function(){
    for(let cantidad_cero of lista_productos){
        cantidad_cero.cantidad = 0;
        cantidad_cero.stock = cantidad_cero.cantidad_restart;
    }
    venta_total = lista_productos.reduce(calcular_monto_total, 0);
    cantidad_total = lista_productos.reduce(calcular_cantidad_total, 0);
    carrito_pill.innerText = `${cantidad_total}`;
})

//Funciones para calcular cantidad y monto, para utilizar con los REDUCE
function calcular_monto_total (acu_monto, producto){

    acu_monto = acu_monto + (producto.cantidad * producto.precio);
    return acu_monto
}

function calcular_cantidad_total (acu_cantidad, producto){

    acu_cantidad = acu_cantidad + producto.cantidad;
    return acu_cantidad
}

//Renderizar las tarjetas con los productos
let tarjetas = document.getElementById("tarjetas");
for(let producto of lista_productos){
    let tarjeta_producto = document.createElement("div");
    tarjeta_producto.innerHTML = `<div class="card tarjetas">
    <img class="card-img-top" src="${producto.ruta}">
    <div class="card-header"><h5 class="card-title">${producto.nombre}</h5></div>
    <div class="card-body">$${producto.precio}<br>Stock disponible: ${producto.stock}</div>
    <div class="card-footer text-right"><button class="btn btn-outline-primary btn-agregar">Agregar al carrito</button></div>
</div>`;
    tarjetas.append(tarjeta_producto);
}

//Filtros de visualización de productos
let tarjetas_filtro = document.getElementsByClassName("tarjetas");
console.log(tarjetas_filtro); //HTML collection de las tarjetas
//Barra de búsqueda
let buscar = document.getElementById("buscar");
buscar.addEventListener("input", function(e){
    console.log("Se escribió", e.target.value);
    
    for(let nombre_buscado of tarjetas_filtro){
        let input_boolean = nombre_buscado.innerText.toLowerCase().includes(e.target.value.toLowerCase());
        if(input_boolean == true){
            console.log("Este producto se queda:", nombre_buscado);
            nombre_buscado.style.display = "flex";
        }
        else{
            console.log("No se encuentra");
            nombre_buscado.style.display = "none";
        }
    }
})

//Cambiar la foto con mouseover
    for(let foto_mouseover of tarjetas_filtro){
        foto_mouseover.addEventListener("mouseover",function(){
            let img = foto_mouseover.getElementsByTagName("img");
            console.log(img);
            //Ver como cambiarle la ruta
    })
}

//Agregar el evento de agregar producto
let btn_agregar = document.querySelectorAll(".btn-agregar");
console.log(btn_agregar);
for (let boton of btn_agregar){
    boton.addEventListener("click", function(e){
        console.log("Se apretó el botón", e.target);
        let nombre_producto = e.target.parentNode.parentNode.querySelector("h5").innerText;
        /*Esto lo tuve que googlear porque no podía llegar al indice en el arreglo con el nombre del producto*/
        lista_productos[lista_productos.findIndex(i => i.nombre === nombre_producto)].product_added(1);
    }
    )}


//Para mostrar los items del carrito
let carrito = document.getElementById("carrito");
carrito.addEventListener("click", function(e){
    //Arma la lista de cada item seleccionado con su cantidad
    let contenido_carrito = document.getElementById("contenido_carrito");
    contenido_carrito.innerHTML = ``;
    for(let item_carrito of lista_productos){
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
    total_carrito.innerHTML = `<p class="total-carrito">Total: $${venta_total}</p>`;
})

//Proceder al pago
let btn_pago = document.getElementById("btn_pago");
btn_pago.addEventListener("click", function(){
    let lista_productos_json = JSON.stringify(lista_productos);
        localStorage.setItem("carrito", lista_productos_json);        
        localStorage.setItem("total", venta_total);
    if(venta_total == 0){
        alert("No ha seleccionado ningún producto!");
    }
    else{        
        window.location.href = "preentrega3_2_barragan.html";
    }
})