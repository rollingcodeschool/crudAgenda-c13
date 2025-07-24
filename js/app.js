// elementos del DOM
const btnAgregarContacto = document.getElementById('btnAgregarContacto');
const modalFormularioContacto = new bootstrap.Modal(document.getElementById('contactoModal'))
console.log(btnAgregarContacto)

//manejadores de eventos
btnAgregarContacto.addEventListener('click', ()=>{
    modalFormularioContacto.show()
})