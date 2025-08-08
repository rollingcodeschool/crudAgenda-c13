export const validarCantidadCaracteres = (input, min, max) => {
  if (input.value.length >= min && input.value.length <= max) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
};

// texto@texto.texto

export const validarEmail = (input)=>{
    const regExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if(regExp.test(input.value)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}

