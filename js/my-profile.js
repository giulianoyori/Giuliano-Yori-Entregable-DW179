//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let usuario2 = document.getElementById("usuario2");
let nombreUsuario = document.getElementById("nombreUsuario");
let apellidoUsuario = document.getElementById("apellidoUsuario");
let edadUsuario = document.getElementById("edadUsuario");
let emailUsuario = document.getElementById("emailUsuario");
let celularUsuario = document.getElementById("celularUsuario");
let imagenUsuarioURL = document.getElementById("URLusuario");
let imagenUsuario = document.getElementById("imagenUsuario");

let botonEditar = document.getElementById("botonEditar");
let botonGuardar = document.getElementById("botonGuardar");
let botonCancelar = document.getElementById("botonCancelar");

document.addEventListener("DOMContentLoaded", function (e) {
    usuario2.value = info;
    if (localStorage.getItem("datosUsuario") != null) {
        let usuarioobj = JSON.parse(localStorage.getItem("datosUsuario"));

        usuario2.value = usuarioobj.usuario
        localStorage.setItem("user", usuarioobj.usuario);

        nombreUsuario.value = usuarioobj.nombre;
        apellidoUsuario.value = usuarioobj.apellido;
        edadUsuario.value = usuarioobj.edad;
        emailUsuario.value = usuarioobj.mail;
        celularUsuario.value = usuarioobj.celular;
       imagenUsuarioURL.value = usuarioobj.imagen;
       //imagenUsuario.setAttribute("src", imagenUsuarioURL.value);
    imagenUsuario.src = imagenUsuarioURL.value;


    }

});



function editarDatos() {
    if (info == null) {
        alert("Debe iniciar sesión para modificar los datos de usuario");
        window.location.href = "index(login).html"
    }
    if (info != null) {
        usuario2.value = info;
        usuario2.removeAttribute("disabled");
        nombreUsuario.removeAttribute("disabled");
        apellidoUsuario.removeAttribute("disabled");
        edadUsuario.removeAttribute("disabled");
        emailUsuario.removeAttribute("disabled");
        celularUsuario.removeAttribute("disabled");
        imagenUsuarioURL.removeAttribute("disabled");
        botonEditar.style.display = "none";
        botonGuardar.style.display = "block";
        

    }
}

function guardarDatos() {
    
    if (usuario2.value == "")
    {alert("El usuario no puede ser nulo. Elija un nuevo nombre de usuario");}
    else{
    let objUsuario = {
        "usuario": usuario2.value, "nombre": nombreUsuario.value, "apellido": apellidoUsuario.value, "edad": edadUsuario.value, "mail": emailUsuario.value, "celular": celularUsuario.value, "imagen": imagenUsuarioURL.value
    }
    let jsonUsuario = JSON.stringify(objUsuario);

    localStorage.setItem("datosUsuario", jsonUsuario);


    localStorage.setItem("user", usuario2.value);
    info = localStorage.getItem("user");
    document.getElementById("nombrebar").innerHTML = info;

    usuario2.disabled = true;
    nombreUsuario.disabled = true;
    apellidoUsuario.disabled = true;
    edadUsuario.disabled = true;
    emailUsuario.disabled = true;
    celularUsuario.disabled = true;
    imagenUsuarioURL.disabled = true
    
    botonEditar.style.display = "block";
    botonGuardar.style.display = "none";
    if (imagenUsuarioURL.value != ""){
        imagenUsuario.src = imagenUsuarioURL.value;  
    }
    

}}
