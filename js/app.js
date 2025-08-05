import Contacto from "./contacto.js";
// elementos del DOM
const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const modalFormularioContacto = new bootstrap.Modal(
  document.getElementById("contactoModal")
);
const formularioContacto = document.getElementById("formContacto");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputEmail = document.getElementById("email");
const inputTelefono = document.getElementById("telefono");
const inputDireccion = document.getElementById("direccion");
const inputNotas = document.getElementById("notas");
const inputImagen = document.getElementById("imagen");
const inputPuestoTrabajo = document.getElementById("puestoTrabajo");
const inputEmpresa = document.getElementById("empresa");
const tbody = document.querySelector("#tablaContactosBody");
let estoyCreando = true;
let idContacto = null;
// verificar si el localstorage tiene contactos, si no tiene hago un array vacio
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];
console.log(agenda);
//Funciones

const guardarLocalstorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
};

const crearContacto = () => {
  console.log("aqui tengo que crear el contacto");
  //todo Agregar validaciones
  //todo agregar una imagen por defecto en el caso de no cargar foto
  //buscar los datos del formulario y crear un objeto contacto
  const contactoNuevo = new Contacto(
    inputNombre.value,
    inputApellido.value,
    inputTelefono.value,
    inputEmail.value,
    inputImagen.value,
    inputEmpresa.value,
    inputPuestoTrabajo.value,
    inputDireccion.value,
    inputNotas.value
  );
  //guardar el contacto en la agenda de contactos
  agenda.push(contactoNuevo);
  console.log(contactoNuevo);
  //guardar la agenda en el localstorage
  guardarLocalstorage();
  //mostrar un mensaje al usuario final
  Swal.fire({
    title: "Contacto creado",
    text: `El contacto ${inputNombre.value} fue creado correctamente.`,
    icon: "success",
    confirmButtonText: "Ok",
  });
  //limpiar el formulario
  limpiarFormulario();
  //dibuje el contacto en la tabla
  dibujarFila(contactoNuevo, agenda.length);
};

function limpiarFormulario() {
  formularioContacto.reset();
}

const cargarContactos = () => {
  //verificar si tengo contactos para cargar
  if (agenda.length !== 0) {
    //recorrer mi agenda y por cada elemento de la agenda
    agenda.map((itemContacto, indice) => dibujarFila(itemContacto, indice + 1));
  } else {
    // todo: dibujar un parrafo que diga que no tenemos contactos
  }
  // si tengo tengo que dibujar las filas en la tabla
};

const dibujarFila = (itemContacto, fila) => {
  tbody.innerHTML += `
     <tr>
                <th scope="row">${fila}</th>
                <td>${itemContacto.nombre}</td>
                <td>${itemContacto.apellido}</td>
                <td>${itemContacto.telefono}</td>
                <td>
                  <img
                    src=${itemContacto.imagen}
                    alt=${itemContacto.nombre}
                    class="img-thumbnail img-table"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-info btn-sm me-2 btn-ver-detalle"
                  >
                    <i class="bi bi-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm me-2 btn-editar"
                    onclick="prepararContacto('${itemContacto.id}')"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm btn-borrar"
                    onclick="borrarContacto('${itemContacto.id}')"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
    `;
};

window.borrarContacto = (id) => {
  Swal.fire({
    title: "Estas seguro de eliminar el contacto",
    text: "No puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      // aqui agrego la logica para borrar
      // tengo que buscar en que posicion esta el contacto con el id que quiero borrar
      const indiceContacto = agenda.findIndex((contacto) => contacto.id === id);
      // con splice borramos el elemento de determinada posicion del array
      agenda.splice(indiceContacto, 1);
      //actualizar el localstorage
      guardarLocalstorage();
      //actualizar la tabla
      tbody.children[indiceContacto].remove();
      //? actualizar el numero de fila del array.
      const filasRestantes = tbody.children;
      for (let i = 0; i < filasRestantes.length; i++) {
        const celdaIndice = filasRestantes[i].querySelector("th");
        if (celdaIndice) {
          celdaIndice.textContent = i + 1; // Actualiza el texto con el nuevo índice
        }
      }
      Swal.fire({
        title: "Contacto eliminado",
        text: "El contacto fue eliminado satisfactoriamente",
        icon: "success",
      });
      console.log(agenda);
    }
  });
};

window.prepararContacto = (id) => {
  // todo: modificar el titulo del formulario
  //cargar los datos del contacto para que los vea el usuario
  const contactoBuscado = agenda.find((contacto) => contacto.id === id);
  console.log(contactoBuscado);
  //mostrar los datos del contacto en el form
  inputNombre.value = contactoBuscado.nombre;
  inputApellido.value = contactoBuscado.apellido;
  inputEmail.value = contactoBuscado.email;
  inputDireccion.value = contactoBuscado.direccion;
  inputEmpresa.value = contactoBuscado.empresa;
  inputImagen.value = contactoBuscado.imagen;
  inputNotas.value = contactoBuscado.notas;
  inputPuestoTrabajo.value = contactoBuscado.puestoTrabajo;
  inputTelefono.value = contactoBuscado.telefono;
  idContacto = id;
  //cambio la variable que controla el crear/editar
  estoyCreando = false;
  //abrir el modal
  modalFormularioContacto.show();
};

const editarContacto = () => {
  console.log("aqui tengo que editar");
  //buscar en que posicion del array esta el contacto con ID
  const indiceContacto = agenda.findIndex(
    (contacto) => contacto.id === idContacto
  );
  //modificar el contacto
  agenda[indiceContacto].nombre = inputNombre.value;
  agenda[indiceContacto].apellido = inputApellido.value;
  agenda[indiceContacto].email = inputEmail.value;
  agenda[indiceContacto].telefono = inputTelefono.value;
  agenda[indiceContacto].imagen = inputImagen.value;
  //  todo: agregar el resto de los inputs
  //actualizar el localstorage
  guardarLocalstorage();
  //actualizar fila de la tabla

  //cerrar el modal
  modalFormularioContacto.hide();

  // todo: mostrar una ventana de sweetalert para indicar que el contacto fue editado correctamente.
};

//manejadores de eventos
btnAgregarContacto.addEventListener("click", () => {
  limpiarFormulario();
  estoyCreando = true;
  modalFormularioContacto.show();
});

formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  //aqui tengo que crear/editar un contacto
  if (estoyCreando) {
    crearContacto();
  } else {
    editarContacto();
  }
});

cargarContactos();
