import Contacto from "./contacto.js";
import { validarCantidadCaracteres, validarEmail } from "./validaciones.js";
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
const tituloModal = document.getElementById("contactoModalLabel");
const tabla = document.querySelector(".table-responsive");
const sectionDetalles = document.getElementById("seccionDetalleContacto");
const seccionTablaContactos = document.getElementById("seccionTablaContactos");
// Elementos para el detalle del contacto
const detalleFoto = document.getElementById('detalleFoto');
const detalleNombreApellido = document.getElementById('detalleNombreApellido');
const detalleEmail = document.getElementById('detalleEmail');
const detalleEmailInfo = document.getElementById('detalleEmailInfo');
const detalleTelefono = document.getElementById('detalleTelefono');
const detalleCompany = document.getElementById('detalleCompany');
const detalleJobTitle = document.getElementById('detalleJobTitle');
const detalleLocation = document.getElementById('detalleLocation');
const detalleNotes = document.getElementById('detalleNotes');
const breadCrumbContactName = document.getElementById('breadCrumbContactName');
const breadCrumbContacts = document.getElementById('breadCrumbContacts');
const btnVolverTabla = document.getElementById('btnVolverTabla');

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
  //todo Agregar validaciones
  if (validacion()) {
    //buscar los datos del formulario y crear un objeto contacto
    const contactoNuevo = new Contacto(
      inputNombre.value,
      inputApellido.value,
      inputTelefono.value,
      inputEmail.value,
      inputImagen.value.length !== 0
        ? inputImagen.value
        : "https://images.pexels.com/photos/28216688/pexels-photo-28216688.png",
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
  } else {
    console.log("hay errores en la validacion");
  }
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
    mostrarNoHaydisponibles();
  }
  // si tengo tengo que dibujar las filas en la tabla
};

const dibujarFila = (itemContacto, fila) => {
  if (tabla.children.length === 2) {
    tabla.children[1].remove();
  }
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
                    onclick="verDetalleContacto('${itemContacto.id}')"
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
      // si es la unica fila a borrar agregar el parrafo de no hay contactos disponibles
      if (tbody.children.length === 0) {
        mostrarNoHaydisponibles();
      }
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
  tituloModal.textContent = "Editar contacto";
};

window.verDetalleContacto = (id) => {
  const contactoBuscado = agenda.find((contacto) => contacto.id === id);
  seccionTablaContactos.classList.add("d-none");
  sectionDetalles.classList.remove("d-none");
}

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
  agenda[indiceContacto].empresa = inputEmpresa.value;
  agenda[indiceContacto].puestoTrabajo = inputPuestoTrabajo.value;
  agenda[indiceContacto].direccion = inputDireccion.value;
  agenda[indiceContacto].notas = inputNotas.value;
  //actualizar el localstorage
  guardarLocalstorage();
  //actualizar fila de la tabla
  const filaEditada = tbody.children[indiceContacto];
  if (filaEditada) {
    // tr.td.img
    filaEditada.children[1].textContent = agenda[indiceContacto].nombre;
    filaEditada.children[2].textContent = agenda[indiceContacto].apellido;
    filaEditada.children[3].textContent = agenda[indiceContacto].telefono;
    filaEditada.children[4].children[0].src = agenda[indiceContacto].imagen;
  }
  //cerrar el modal
  modalFormularioContacto.hide();

  Swal.fire({
    title: "Contacto actualizado",
    text: `El contacto ${agenda[indiceContacto].nombre} fue actualizado correctamente.`,
    icon: "success",
    confirmButtonText: "Ok",
  });
};

const validacion = () => {
  let datosValidos = true;
  if (!validarCantidadCaracteres(inputNombre, 2, 50)) {
    datosValidos = false;
  }
  if (!validarCantidadCaracteres(inputApellido, 3, 50)) {
    datosValidos = false;
  }
  if(!validarEmail(inputEmail)) {
    datosValidos = false; 
  }
  // todo: agregar el resto de las funciones de validacion
  return datosValidos;
};

const mostrarNoHaydisponibles = () => {
  const parrafo = document.createElement("p");
  parrafo.classList.add("text-center");
  parrafo.textContent = "No hay contactos disponibles";
  tabla.appendChild(parrafo);
};

const mostrarTablaContactos = () => {
    seccionTablaContactos.classList.remove('d-none');
    sectionDetalles.classList.add('d-none');
};

//manejadores de eventos
btnAgregarContacto.addEventListener("click", () => {
  limpiarFormulario();
  estoyCreando = true;
  tituloModal.textContent = "Crear contacto";
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

btnVolverTabla.addEventListener('click', mostrarTablaContactos);
breadCrumbContacts.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarTablaContactos();
});

cargarContactos();
