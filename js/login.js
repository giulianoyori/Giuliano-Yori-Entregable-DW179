//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
        
});

function guardar(user, password){  
            // si el campo está vacío, muestra un alert indicando el error
             //si el campo no está vacío, guarda al usuario y muestra un alert con el dato ingresado

             var dato = document.getElementById("dato");
             var otrodato = document.getElementById("otrodato");
             if(user == "" || password == ""){
                 alert("Ingrese datos válidos");
             }
            else {localStorage.setItem("user",user)
            alert("Bienvenido/a " + user + "!!!");
           window.location.href = "index2.html";}
           
        }
     function comprobar(password){
        var otrodato = document.getElementById("otrodato");

        if(password == ""){
                 alert("Ingrese datos válidos");
             }}
    

