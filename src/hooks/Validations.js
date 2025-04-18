export function ValidateInputs(inputs) {
  let data = true;
  inputs.forEach((element) => {
    if (element.value.trim() == "") {
      data = false;
    }
  });
  return data;
}

export function MessageFormError(form, message) {
  form.querySelector("#textError").innerHTML = message ? message : "Preencha todos os campos!";
  form.querySelector("#textError").classList.add("error");
  form.querySelector("#textError").classList.remove("sucess");
}

export function MessageFormSuccess(form, message) {
  form.querySelector("#textError").innerHTML =  message ? message : "Sucesso!";
  form.querySelector("#textError").classList.add("sucess");
  form.querySelector("#textError").classList.remove("error");
}
