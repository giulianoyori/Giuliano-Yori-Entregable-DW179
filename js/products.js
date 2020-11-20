//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;
      //Muestro las categorías ordenadas
      showProductsList(productsArray);
    }
  });



});

var productsArray = [];
//FUNCIÓN QUE GENERA UNA PORCIÓN DE HTML Y LA AÑADE A NUESTRO DOCUMENTO MOSTRANDO CADA  ARTÍCULO CON UN CICLO: "FOR"
//TOMA LOS DATOS DE LOS ARTÍCULOS DEL ARRAY OBTENIDO  DE LA URL MEDIANTE EL "getJSONData" 
function showProductsList(array) {

  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let product = array[i];

    htmlContentToAppend += `
     

        <div class="col-4">
        <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
          <img class="bd-placeholder-img card-img-top" src="${product.imgSrc}">
          <h3 class="m-3">${product.name} </h3>
          <div class="card-body">
            <p class="card-text">${product.description}</p>
          </div>
          <h4 class="m-3 text-right">${product.currency + "  " + product.cost} </h4>
          <h5 class="m-3 text-right text-muted">${product.soldCount} Unidades vendidas</h5>

        </a>
    </div>


        `

    document.getElementById("contenedorDestino").innerHTML = htmlContentToAppend;
  }
}


//fUNCIÓN QUE ORDENA AL ARRAY DE LOS PRODUCTOS SEGÚN EL CRITERIO MEDIANTE EL MÉTODO: "SORT"
//LUEGO MUESTRA EL ARRAY YA ORDENADO CON LA FUNCIÓN: "showProductsList"

function ordenar() {
  let criterios = document.getElementById('orden');
  let criterio = criterios.value;

  if (criterio === "mayorprecio") {
    productsArray.sort(function (prev, next) {
      return next.cost - prev.cost;
    });
    showProductsList(productsArray);

  }
  if (criterio === "menorprecio") {
    productsArray.sort(function (prev, next) {
      return prev.cost - next.cost;
    });
    showProductsList(productsArray);
  }
  if (criterio === "relevancia") {
    productsArray.sort(function (prev, next) {
      return next.soldCount - prev.soldCount;
    });
    showProductsList(productsArray);
  }

}
ordenar();

//SE OBTIENE POR ID LA INFORMACIÓN DEL INPUT DE BÚSQUEDA
document.getElementById("barraBusqueda").addEventListener("keyup", buscar);

let arrayEncontrados = [];

//FUNCIÓN QUE FILTRA EL ARRAY DE PRODUCTOS SEGÚN LO QUE SE OBTIENE DEL INPUT DE BÚSQUEDA
//LUEGO MUESTRA EL ARRAY YA FILLTRADO CON LA FUNCIÓN: "showProductsList"
function buscar() {
  let barraBusqueda = document.getElementById("barraBusqueda").value.toLowerCase();
  arrayEncontrados = productsArray.filter((product) => {
    return (product.name.toLowerCase().includes(barraBusqueda) || product.description.toLowerCase().includes(barraBusqueda));

  })
  if (arrayEncontrados.length == 0) {
    document.getElementById("contenedorDestino").innerHTML = "No hay productos que coincidan con sus criterios de búsqueda";
  }
  else {
    showProductsList(arrayEncontrados);
  }
}


//FUNCIÓN QUE OBTINE PARÁMETROS DE MAYOR Y MENOR PRECIO Y FILTRA EL ARRAY DE PRODUCTOS SEGÚN 
//SU PRECIO. DEBE ESTAR DENTRO DEL RANGO
//LUEGO MUESTRA EL ARRAY YA FILLTRADO CON LA FUNCIÓN: "showProductsList"
function rangoPrecios() {
  let precioMenor = document.getElementById("preciomenor").value;
  let precioMayor = document.getElementById("preciomayor").value;

  arrayEncontrados = productsArray.filter((product) => {
    return (product.cost >= precioMenor && product.cost <= precioMayor);
  })
  if (arrayEncontrados.length == 0) {
    document.getElementById("contenedorDestino").innerHTML = "No hay productos que coincidan con sus criterios de búsqueda";
  }
  else {
    showProductsList(arrayEncontrados);
  }
}
