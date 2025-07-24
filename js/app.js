// elementos del DOM
const btnAgregarContacto = document.getElementById('btnAgregarContacto');
const modalFormularioContacto = new bootstrap.Modal(document.getElementById('contactoModal'))
const formularioContacto = document.getElementById('formContacto')

//Funciones
const crearContacto = ()=>{
    console.log('aqui tengo que crear el contacto')
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