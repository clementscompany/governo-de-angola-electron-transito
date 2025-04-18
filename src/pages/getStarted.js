import { Modal, PpoUp, Spinner4 } from "../components/elements.js";
import { MessageFormError, MessageFormSuccess, ValidateInputs } from "../hooks/Validations.js";
import fetchApi from "../utils/fetchData.js";
import FormUsers from "./Users/FormUsers.js";

class getStarted{
  constructor(mainContainer){
    this.mainContainer = mainContainer;
    this.modal = document.createElement("section");
    this.init(mainContainer)
  }

  init(mainContainer){
    this.modal.classList.add("modal");
    mainContainer.appendChild(this.modal);
    this.modal.innerHTML = FormUsers(null, "Vamos Começar");
    const form = mainContainer.querySelector("#formCadastroUsers");
    this.SendData(mainContainer, form);
  }


  SendData(mainContainer, form){
    form.addEventListener("submit", async (e)=> {
      e.preventDefault()
      const inputs = form.querySelectorAll("input, select");
      if (inputs) {
        if (ValidateInputs(inputs) === false) {
          MessageFormError(form);
          return;
        }
        MessageFormError(form, " ");
        let data = {};
        inputs.forEach(input => {
          data[input.name] = input.value;
        });
          MessageFormSuccess(form, Spinner4());
        try {
         const api = await fetchApi({ uri: "/auth/signin", data: data, method: "POST" });
         if (api.success) {
          MessageFormSuccess(form, api.message);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          return;
         } 
         MessageFormError(form, api.message);
        } catch (error) { 
          mainContainer
          .querySelector(".modal")
          .innerHTML = PpoUp("Erro ao enviar os dados. erro: " + error, "error");
          mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
            window.location.reload();
          });
        }
      }
    }) 
  }
}
export default getStarted;