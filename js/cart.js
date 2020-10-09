//DECLARAMOS GLOBALES LAS VARIABLES QUE NOS SIRVEN PARA VARIAS  FUNCIONES:
let arrayArticles =[];
let subtotaltotal=0;

//FUNCIÓN QUE RECIBE UNA CANTIDAD Y UN INDICADOR Y CALCULA EL SUBTOTAL DE CADA ARTÍCULO EN UYU:
function calcSubTotal(count,index){
    let sub=0;
    if(arrayArticles[index].currency==="USD"){
        sub = arrayArticles[index].unitCost*count*40;

    }else{
        sub = arrayArticles[index].unitCost*count;
    }
    return sub;
}

//FUNCIÓN QUE OBTIENE LAS CANTIDADES DE CADA PRODUCTO MEDIANTE LA CLASE DE LOS INPUT:
//CALCULA EL SUBTOTAL DE CADA ARTÍCULO USANDO LA FUNCIÓN: "calcSubTotal":
//CALCULA LA SUMA DE LOS SUBTOTALES INDIVIDUALES RECORRIENDO EL ARRAY DE LAS CANTIDADES CON UN CICLO: "FOR":
function updateAllSubTotal(){
    let cantidadesArray = document.getElementsByClassName("countArticle");
    let subtotal =0;
    for(let i=0;i<cantidadesArray.length;i++){
        subtotal += calcSubTotal(cantidadesArray[i].value,i);
    }
    document.getElementById("subtotal").innerHTML = "UYU " + subtotal;
    subtotaltotal=subtotal; 

}
//FUNCIÓN QUE OBTIENE LO QUE CALCULAMOS EN LA FUNCIÓN: "updateAllSubTotal" Y LO COLOCA EN EL HTML:
//(LUEGO TAMBIÉN TENDRÁ EL COSTO DE ENVÍO)
function calcTotal(){
    let total = subtotaltotal;
    document.getElementById("total").innerHTML = "UYU " + total;
}

//FUNCIÓN QUE AL CAMBIAR EL VALOR DE LAS CANTIDADES ACTUALIZA EL SUBTOTAL INDIVIDUAL DE LOS ARTÍCULOS,
//ACTUALIZA TAMBIÉN EL SUBTOTAL GENERAL Y EL TOTAL LLAMANDO DENTRO DEL EVENTO: "CHANGE" A LAS RESPECTIVAS FUNCIONES YA DEFINIDAS
function addEventCount(){
    let subtotalArray = document.getElementsByClassName("countArticle");
    for(let i=0;i<subtotalArray.length;i++){
        subtotalArray[i].addEventListener("change",function(){
        document.getElementById("productSubtotal-"+i).innerHTML= arrayArticles[i].currency + " "+subtotalArray[i].value* arrayArticles[i].unitCost;
        updateAllSubTotal();
        calcTotal();
    });

    }
    

}

//FUNCIÓN QUE GENERA UNA PORCIÓN DE HTML Y LA AÑADE A NUESTRO DOCUMENTO MOSTRANDO CADA  ARTÍCULO CON UN CICLO: "FOR"
//TOMA LOS DATOS DE LOS ARTÍCULOS DEL ARRAY OBTENIDO  DE LA URL MEDIANTE EL "getJSONData" 
function showArticles(articles){
   let htmlContentToAppend ="";
    for(let i = 0; i < articles.length; i++){
       
        htmlContentToAppend += `
        <tr>
            <td><img src='`+ articles[i].src + `' width="50px"></td>
            <td>`+ articles[i].name + `</td>
            <td>`+ articles[i].currency + " " + articles[i].unitCost +`</td>
            <td><input class="form-control countArticle" style="width:60px;" type="number" id="productCount-${i}" value="`+ articles[i].count + `" min="1"></td>
            <td><span id="productSubtotal-${i}" style="font-weight:bold;">${articles[i].currency} ${articles[i].unitCost * articles[i].count}</span></td>
        </tr>
        `
              
    }
    document.getElementById("tabla").innerHTML = htmlContentToAppend;
    addEventCount();
    updateAllSubTotal();
    calcTotal();


}
// OBTENEMOS EL JSON CON LA FUNCIÓN DEFINIDA EN EL INIT.JS: "getJSONData();" 
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        if (resultObj.status === 'ok')
        {
            arrayArticles=resultObj.data.articles;
            showArticles(arrayArticles);
        }
    });
})