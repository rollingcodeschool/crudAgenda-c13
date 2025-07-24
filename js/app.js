import Contacto from "./contacto.js";
// elementos del DOM
const btnAgregarContacto = document.getElementById('btnAgregarContacto');
const modalFormularioContacto = new bootstrap.Modal(document.getElementById('contactoModal'))
const formularioContacto = document.getElementById('formContacto')
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputEmail = document.getElementById('email');
const inputTelefono = document.getElementById('telefono');
const inputDireccion = document.getElementById('direccion');
const inputNotas = document.getElementById('notas');
const inputImagen = document.getElementById('imagen');
const inputPuestoTrabajo = document.getElementById('puestoTrabajo');
const inputEmpresa= document.getElementById('empresa');

//Funciones
const crearContacto = ()=>{
    console.log('aqui tengo que crear el contacto')
    // todo Agregar validaciones
    //buscar los datos del formulario y crear un objeto contacto
    //guardar el contacto en la agenda de contactos
    //guardar la agenda en el localstorage
    const contactoNuevo = new Contacto(1,1,1,1,1,1,1,1,1,1)
    console.log(contactoNuevo)
}


//manejadores de eventos
btnAgregarContacto.addEventListener('click', ()=>{
    modalFormularioContacto.show()
})

formularioContacto.addEventListener('submit', (e)=>{
    e.preventDefault()
    //aqui tengo que crear/editar un contacto
    crearContacto()
})