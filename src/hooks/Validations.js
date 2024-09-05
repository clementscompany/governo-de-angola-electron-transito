export function ValidateInputs(inputs) {
  let data = true;
  inputs.forEach(element => {
    if (element.value.trim() == "") {
      data = false;
    }
  });
  return data;
}

export function MessageFormError(form){
  form.querySelector("#textError").innerHTML = "Preencha todos os campos!";
 form.querySelector("#textError").classList.add("error");
}