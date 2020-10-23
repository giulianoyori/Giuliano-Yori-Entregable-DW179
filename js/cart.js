//DECLARAMOS GLOBALES LAS VARIABLES QUE NOS SIRVEN PARA VARIAS  FUNCIONES:
let arrayArticles = [];
let subtotaltotal = 0;
let porcentajeEnvío = 0;
let pago = false;

//Eventos change sobre las opciones de envío, para reflejar y actualizar los costos de envío
document.getElementById("standard").addEventListener("change", function () {
    porcentajeEnvío = 0.05
    costoEnvio();
    calcTotal();
});

document.getElementById("express").addEventListener("change", function () {
    porcentajeEnvío = 0.07
    costoEnvio();
    calcTotal();
});

document.getElementById("premium").addEventListener("change", function () {
    porcentajeEnvío = 0.15
    costoEnvio();
    calcTotal();
});


//FUNCIÓN QUE RECIBE UNA CANTIDAD Y UN INDICADOR Y CALCULA EL SUBTOTAL DE CADA ARTÍCULO EN UYU:
function calcSubTotal(count, index) {
    let sub = 0;
    if (arrayArticles[index].currency === "USD") {
        sub = arrayArticles[index].unitCost * count * 40;

    } else {
        sub = arrayArticles[index].unitCost * count;
    }
    return sub;
}

//FUNCIÓN QUE OBTIENE LAS CANTIDADES DE CADA PRODUCTO MEDIANTE LA CLASE DE LOS INPUT:
//CALCULA EL SUBTOTAL DE CADA ARTÍCULO USANDO LA FUNCIÓN: "calcSubTotal":
//CALCULA LA SUMA DE LOS SUBTOTALES INDIVIDUALES RECORRIENDO EL ARRAY DE LAS CANTIDADES CON UN CICLO: "FOR":
function updateAllSubTotal() {
    let cantidadesArray = document.getElementsByClassName("countArticle");
    let subtotal = 0;
    for (let i = 0; i < cantidadesArray.length; i++) {
        subtotal += calcSubTotal(cantidadesArray[i].value, i);
    }
    document.getElementById("subtotal").innerHTML = "UYU " + subtotal;
    subtotaltotal = subtotal;

}
//FUNCIÓN QUE OBTIENE LO QUE CALCULAMOS EN LA FUNCIÓN: "updateAllSubTotal" Y LO COLOCA EN EL HTML:
//(LUEGO TAMBIÉN TENDRÁ EL COSTO DE ENVÍO)
function calcTotal() {
    let total = subtotaltotal + subtotaltotal * porcentajeEnvío;
    document.getElementById("total").innerHTML = "UYU " + total;
}

//FUNCIÓN QUE AL CAMBIAR EL VALOR DE LAS CANTIDADES ACTUALIZA EL SUBTOTAL INDIVIDUAL DE LOS ARTÍCULOS,
//ACTUALIZA TAMBIÉN EL SUBTOTAL GENERAL Y EL TOTAL LLAMANDO DENTRO DEL EVENTO: "CHANGE" A LAS RESPECTIVAS FUNCIONES YA DEFINIDAS
function addEventCount() {
    let subtotalArray = document.getElementsByClassName("countArticle");
    for (let i = 0; i < subtotalArray.length; i++) {
        subtotalArray[i].addEventListener("change", function () {
            document.getElementById("productSubtotal-" + i).innerHTML = arrayArticles[i].currency + " " + subtotalArray[i].value * arrayArticles[i].unitCost;
            updateAllSubTotal();
            costoEnvio();
            calcTotal();

        });

    }


}

//FUNCIÓN QUE GENERA UNA PORCIÓN DE HTML Y LA AÑADE A NUESTRO DOCUMENTO MOSTRANDO CADA  ARTÍCULO CON UN CICLO: "FOR"
//TOMA LOS DATOS DE LOS ARTÍCULOS DEL ARRAY OBTENIDO  DE LA URL MEDIANTE EL "getJSONData" 
function showArticles(articles) {
    let htmlContentToAppend = "";
    htmlContentToAppend =
        `
   <tr>
   <th><h3>Tu Carrito de compras:</h3></th>
 </tr>
   <tr>
   <th>Imagen</th>
   <th>Nombre del artículo</th>
   <th>Moneda/Monto</th>
   <th>Cantidad</th>
   <th>Subtotal</th>
   <th>Eliminar</th>
   </tr>
   `
    for (let i = 0; i < articles.length; i++) {
        let contador = "fila" + i;

        htmlContentToAppend += `
        <tr id="${i}">
            <td><img src='`+ articles[i].src + `' width="50px"></td>
            <td>`+ articles[i].name + `</td>
            <td>`+ articles[i].currency + " " + articles[i].unitCost + `</td>
            <td><input class="form-control countArticle" style="width:60px;" type="number" id="productCount-${i}" value="` + articles[i].count + `" min="1"></td>
            <td><span id="productSubtotal-${i}" style="font-weight:bold;">${articles[i].currency} ${articles[i].unitCost * articles[i].count}</span></td>
            <td><button class="btn btn-link" onclick="borrarProducto(${i});" >Eliminar</button></td>
        </tr>
        `

    }
    document.getElementById("tabla").innerHTML = htmlContentToAppend;
    addEventCount();
    updateAllSubTotal();
    calcTotal();


}
//función que calcula  el costo de envío y lo expresa en la pagina
function costoEnvio() {

    document.getElementById("costoEnvio").innerHTML = "UYU " + Math.round(subtotaltotal * porcentajeEnvío);
}


//Eventos de las opciones que se encuentran dentro del modal de medios de pago
//Desabilita los input de tipo text de una sección si no es la elegida
document.getElementById("tarjetaCreditoRadio").addEventListener("click", function () {
    document.getElementById("numerodecuenta").disabled = true;
    document.getElementById("numTarjeta").disabled = false;
    document.getElementById("codTarjeta").disabled = false;
    document.getElementById("fechaTarjeta").disabled = false;
})
document.getElementById("transBancRadio").addEventListener("click", function () {
    document.getElementById("numerodecuenta").disabled = false;
    document.getElementById("numTarjeta").disabled = true;
    document.getElementById("codTarjeta").disabled = true;
    document.getElementById("fechaTarjeta").disabled = true;

})

//función que valida los datos de pago dentro del modal, se llama desde un evento onclick en el botón
function validarPagos() {
    if (
        !(document.getElementById("tarjetaCreditoRadio").checked) &&
        !(document.getElementById("transBancRadio").checked)) {
        alert("Debe seleccionar un medio de pago");
    }
    if ((document.getElementById("tarjetaCreditoRadio").checked)) {
        if (!(document.getElementById("numTarjeta").value)
            || !(document.getElementById("codTarjeta").value)
            || !(document.getElementById("fechaTarjeta").value)

        ) {
            alert("Debe completar todos los datos solicitados de su tarjeta");
        }
    }
    if ((document.getElementById("tarjetaCreditoRadio").checked)) {
        if ((document.getElementById("numTarjeta").value)
            && (document.getElementById("codTarjeta").value)
            && (document.getElementById("fechaTarjeta").value)

        ) {
            document.getElementById("innerFormaPago").innerHTML = "Ha ingresado una tarjeta como medio de pago";
            pago = true;
            $('#paymentModal').modal('hide');

        }
    }

    if ((document.getElementById("transBancRadio").checked)) {
        if (!(document.getElementById("numerodecuenta").value)) {
            alert("Debe ingresar el número de su cuenta bancaria");
        }
    }
    if ((document.getElementById("transBancRadio").checked)) {
        if ((document.getElementById("numerodecuenta").value)) {
            document.getElementById("innerFormaPago").innerHTML = "Ha ingresado una cuenta bancaria como medio de pago";
            pago = true;
            $('#paymentModal').modal('hide');
        }
    }
}

//Función que valida todos los campos aa rellenar por el cliente antes de efectuar la compra:
function validarDatos() {
    if (subtotaltotal == 0) {
        alert("Su carrito está vacío. El carrito debe tener al menos 1 artículo para efectuar la compra");
    }
    if (
        !(document.getElementById("standard").checked) &&
        !(document.getElementById("premium").checked) &&
        !(document.getElementById("express").checked)
    ) {
        alert("Debe elegir un método de envío")
    }

    if (!(document.getElementById("nombreCalle").value) ||
        !(document.getElementById("numeroCalle").value) ||
        !(document.getElementById("esquinaCalle").value)
    ) {
        alert("Debe ingresar todos los datos del envío");
    }
    if (pago == false) {
        alert("Debe seleccionar un medio de pago");
    }

    if (pago == true && subtotaltotal !== 0 &&
        ((document.getElementById("standard").checked) ||
            (document.getElementById("premium").checked) ||
            (document.getElementById("express").checked))
        &&
        ((document.getElementById("nombreCalle").value) &&
            (document.getElementById("numeroCalle").value) &&
            (document.getElementById("esquinaCalle").value))) {
        alert("FELICITACIONES!!! Su compra ha sido realizada con éxito!!!");
    }
}

//Función que borra los producos del carrito
function borrarProducto(id) {
    //let padre = document.getElementById("tabla");
    let producto = document.getElementById(id);
    producto.style.display = "none";
    arrayArticles[id].unitCost = 0;

    // padre.removeChild(producto);
    updateAllSubTotal();
    calcTotal();
    costoEnvio();
}

// OBTENEMOS EL JSON CON LA FUNCIÓN DEFINIDA EN EL INIT.JS: "getJSONData();" 
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        if (resultObj.status === 'ok') {
            arrayArticles = resultObj.data.articles;
            showArticles(arrayArticles);
        }
    });
})