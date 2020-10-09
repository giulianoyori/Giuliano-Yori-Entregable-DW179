var infoProductos = {};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
// OBTENEMOS LOS JSON QUE PRECISAMOS CON LA FUNCIÓN DEFINIDA EN EL INIT.JS: "getJSONData();" 
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comentsArray = resultObj.data;
            
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
             
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            infoProductos = resultObj.data;
    
        }
//DESARROLLAMOS LA INFORMACIÓN DEL PRODUCTO OBTENIDA DE "INFO_PRODUCTOS"CON LA FUNCION: "showProductInfo"
showProductInfo(infoProductos);
//MOSTRAMOS LOS PRODUCTOS RELACIONADOS OBTENIDOS DE "INFO_PRODUCTOS"
prodRelacionados(infoProductos);
//MOSTRAMOS LOS COMENTARIOS
listaComentarios(comentsArray);
});
});


//FUNCIONES QUE SE USAN PARA HACER CLIC EN LAS IMÁGENES PEQUEÑAS Y QUE SE MUESTREN EN LA IMAGEN GRANDE
//SE LAS LLAMA EN EL DESARROLLO DE LA INFO EN EL EVENTO "ONCLICK" DE LOS DIVS CONTENEDORES
function pushimage1(array){
document.getElementById("bigimage").innerHTML = `<img src=${array.images[0]}>`;    
}
function pushimage2(array){
document.getElementById("bigimage").innerHTML = `<img src=${array.images[1]} >`;
}
function pushimage3(array){
document.getElementById("bigimage").innerHTML = `<img src=${array.images[2]} >`;
}
function pushimage4(array){
document.getElementById("bigimage").innerHTML = `<img src=${array.images[3]} >`;
}
function pushimage5(array){
document.getElementById("bigimage").innerHTML = `<img src=${array.images[4]} >`;
}
    

//FUNCIÓN QUE GENERA UN FRAGMENTO DE CODIGO HTML Y LO INSERTA EN EL DOCUMENTO USANDO LOS DATOS DEL ARRAY "PRODUCTS_INFO"
function showProductInfo(array){
  let htmlContentToAppend = "";
  htmlContentToAppend = `
  <div class="text-center">
  <h1>${array.name}</h1>
  <h2>${array.currency} ${array.cost}</h2>
  <h3 class="text-right">${array.soldCount} unidades vendidas.</h3>
  </div>
  <br>
  <div class="text-justify">
  <p>${array.description}</p>
  </div>
  <div id="holas" class"row mb-3">
  <div onclick="pushimage1(infoProductos);" class="col-2"> <img src=${array.images[0]}>  </div>
  <div onclick="pushimage2(infoProductos);" class="col-2"> <img src=${array.images[1]}>  </div>
  <div onclick="pushimage3(infoProductos);" class="col-2"> <img src=${array.images[2]}>  </div>
  <div onclick="pushimage4(infoProductos);" class="col-2"> <img src=${array.images[3]}>  </div>
  <div onclick="pushimage5(infoProductos);" class="col-2"> <img src=${array.images[4]}>  </div>
  <br>
  <div class="p-5"id="bigimage"> <img src=${array.images[0]} ></div>
  </div>
  <div><h3>Ver más de la categoría: <a href="category-info.html">${array.category}</a></h3></div>
  <br> 
  `;
  document.getElementById("contenedorProducto").innerHTML = htmlContentToAppend; 
    };

//FUNCIÓN QUE EXTRAE CUALES SON LOS PRODUCTOS RELACIONADOS Y LOS MUESTRA CON LA FUNCION: "desarrollarProdRelacionados" 
    function prodRelacionados(array){
        let relacionado = array.relatedProducts;
        
        relacionado.forEach(element =>
            desarrollarProdRelacionados(element));}

//FUNCIÓN QUE MUESTRA LOS PRODUCTOS RELACIONADOS USANDO EL ARRAY DE PRODUCTOS
    function desarrollarProdRelacionados(element){
        product = productsArray[element];
        
        htmlContentToAppend2 = `
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="list-group-item list-group-item-action">
            <div  class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        
                        <p class="text-muted">` + product.currency + " " + product.cost + " </br>" + product.soldCount +` Unidades vendidas</p>
                    </div>
                 <p>` + product.description + `</p>
                
                </div>
            </div>
        </div>
        </a>
        `
      
        document.getElementById("relacionados").innerHTML += htmlContentToAppend2;
    }
  
//FUNCIÓN QUE MUESTRA LA LISTA DE COMENTARIOS EXISTENTES
    function listaComentarios(array){
        let htmlContentToAppend = "";
        for(let i = 0; i < array.length; i++){
        let coment = array[i];

//MOSTRAMOS LAS ESTRELLAS CON ICONOS MEDIANTE CICLOS FOR
        let estrellas = "";
        for (let i=1; i<=coment.score; i++){
            estrellas += `<i class="fa fa-star checked"></i>`
        }
        for (let i=coment.score + 1; i<=5; i++){
            estrellas += `<i class="fa fa-star"></i>`
        }
  
      htmlContentToAppend += `
      <div class="border p-3">
      <h4>Calificación:${estrellas}</h4>
      <h4>${coment.user}</h4>
      <p>${coment.description}</p>
      <p>${coment.dateTime}</p>
     </div>
`
      document.getElementById("comentarios").innerHTML = htmlContentToAppend;
        }}

//FUNCIÓN PARA AGREGAR NUEVOS COMENTARIOS A LA LISTA
//SE LA LLAMA EN EL EVENTO "ONCLICK" DEL BOTON DE AGREGAR COMENTARIO
        function agregarComentario(){
        let puntuacion = document.getElementById("rating").value;
        let dateComent = new Date();
        let fecha = dateComent.getFullYear() + "-" + dateComent.getMonth() + "-" + dateComent.getDate() + ", " + dateComent.getHours() + ":" + dateComent.getMinutes() + ":" + dateComent.getSeconds();
        let contenidocomentario = document.getElementById("contenidocomentario").value;
        let usuario = localStorage.getItem('user');
        let estrella = ""
        
        for (let i=1; i<=puntuacion; i++){
            estrella += `<i class="fa fa-star checked"></i>`;
        }

        for (let i= puntuacion; i<=4; i++){
            estrella += `<i class="fa fa-star"></i>`;
        }

        let comentarios = "";
        comentarios = `
        <div class="border p-3">
      <h4>Calificación:${estrella}</h4>
      <h4>${usuario}</h4>
      <p>${contenidocomentario}</p>
      <p>${fecha}</p>
     </div>
        `

            document.getElementById("comentarios").innerHTML += comentarios;
        }