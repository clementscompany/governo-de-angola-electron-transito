import { mainContainer } from "../../../renderer.js";
import infraClass from "../../class/infra.class.js";
import ComponentHome from "../../components/ComponentHome.js";
import { ContentModal, Modal, PpoUp } from "../../components/elements.js";
import Menu from "../../components/Menu.js";
import SearchBox from "../../components/SearchBox.js";
import { API_URL } from "../../env.js";
import { MessageFormError, ValidateInputs } from "../../hooks/Validations.js";
import Settings from "../settings/Settings.js";
import ThemeSystem from "../settings/ThemeSystem.js";
import { ListaUsuarios } from "./CardsInfra.js";
import FormInfracoes from "./FormInfracoes.js";
import TableInfracoes from "./TableInfracoes.js";
export default async function Infracoes(){
  try {
    const session_id = sessionStorage.getItem("session_token");
    const modalContainer = document.createElement("section");
    modalContainer.classList.add("modalFocus");
    let dataViaturas = await fetch(`${API_URL}/infracoes`, 
      {
        method:"GET",
        headers:{
          "Token-Acces":session_id
        }
      }
    ); if (dataViaturas.ok) {
        var info = await dataViaturas.json();
        mainContainer.innerHTML = ComponentHome("Infrações");
        mainContainer.querySelector("#menu").innerHTML = Menu();
        mainContainer.querySelector("#recents").innerHTML = TableInfracoes(info);
        infraClass.Estatisticas(mainContainer);
        mainContainer.querySelector("#searchElement").innerHTML = SearchBox();
     
        const modalContainer = document.createElement("section");
        modalContainer.classList.add("modalFocus");
        let list = mainContainer.querySelectorAll("#listMenu >  li");
        let addButton = mainContainer.querySelector("#addButton");
        let searchBox = mainContainer.querySelector("#searchBox");
        let editInfraBtn = mainContainer.querySelectorAll(".editInfraBtn");
        let deleteInfraButton = mainContainer.querySelectorAll(".deleteInfraButton");
        let viewEditButton = mainContainer.querySelectorAll(".viewEditButton");
        let reloadButton = mainContainer.querySelector("#reloadButton");
        Settings(mainContainer);
        ThemeSystem.changeTheme(mainContainer);

        reloadButton.addEventListener("click", 
          ()=>{ Infracoes() }
        )

        viewEditButton.forEach((button)=>{
          button.addEventListener("click", 
            ()=>{Viaualizar(button.value)}
          )
        })
        deleteInfraButton.forEach((button)=>{
          button.addEventListener("click", ()=>{ Eliminar(mainContainer, button.value) })
        })
        editInfraBtn.forEach((button)=>{
          button.addEventListener("click", ()=>{ Editar(button.value) })
        })

        searchBox.addEventListener("submit", (e)=>{
          e.preventDefault();
          Pesauisar(e);
        })
        addButton.addEventListener("click", ()=>{ Cadastrar() })
        list[3].classList.add("active");
        list[3].addEventListener("click", 
          ()=>{ Infracoes() }
        );


        function Cadastrar(){//Cadastrar
          mainContainer.appendChild(modalContainer);
          modalContainer.innerHTML = ContentModal(ListaUsuarios());
          let inputBi = mainContainer.querySelector("#inputBi");
          let preencherForm = mainContainer.querySelector("#preencherForm");
          let closeModal = mainContainer.querySelector("#closeModal");

          closeModal.addEventListener("click", ()=>{ CloseModal() })
          
          preencherForm.addEventListener("click", async ()=>{
            if (inputBi.value.trim() !== "") {
              try {
                let getBi = await fetch(`${API_URL}/condutores?bi=${inputBi.value}`, {
                  method:"GET",
                  headers:{
                    "Token-Acces":session_id
                  }
                });
                if (getBi.ok) {
                  let data = await getBi.json();
                  if (data.condutores) {
                    let { sucess, error } = data.condutores;
                    if (sucess) {
                      AddInfration(sucess[0])
                    } else{
                      Message(error, "error");
                    }
                  } else{
                    Message("Erro so obteros dados", "error");
                  }
                } else{
                  Error("Erro:" + getBi.statusText, "error");
                }
              } catch (error) {
                Error("Erro: "+error, "error");
              }
            } else{
              inputBi.style.border = "1px solid #fd373763";
            }
          })

          function AddInfration(data) {
            modalContainer.innerHTML = FormInfracoes();
            let form = mainContainer.querySelector("#formCadastroInfracoes");
            form.querySelector("#closeButton").addEventListener("click", ()=>{ Infracoes() });
            let inputs = form.querySelectorAll(".input");

            form.addEventListener("submit", async (e)=>{
              e.preventDefault();

              if (ValidateInputs(inputs)) {
                let formData = new FormData(form);
                formData.append("id", data.id);
                infraClass.Cadastrar(form, formData);
              } else{
                MessageFormError(form);
              }
            });
          }

          function Message(message, status){
            mainContainer.querySelector(".textError").innerHTML = message;
            mainContainer.querySelector(".textError").classList.add(status);
          }
          function Error(message, status){
            modalContainer.innerHTML = PpoUp(message, status);
            mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
              Infracoes();
            })
          }
          function CloseModal() {
            mainContainer.removeChild(modalContainer);
            modalContainer.innerHTML = "";
          }
        }// Cadastrar
        function Eliminar(container,id){
          modalContainer.classList.add('modalFocus');
          mainContainer.appendChild(modalContainer);
          infraClass.DeleteOnModal(container, id);
        }
        function Editar(id){
          infraClass.Editar(mainContainer, id);
        }
        async function Viaualizar(id){
          let data = await infraClass.GetById(id)
          infraClass.ListOutModal(mainContainer, data.result.sucess)          
        }
        
        function Pesauisar(form){
          infraClass.Pesquisar(form, mainContainer);
        }
    } else{
      mainContainer.innerHTML = Modal(PpoUp("Erro: " + dataViaturas.statusText, "error"));
      mainContainer.querySelector("#closePopUp").addEventListener("click",
        ()=>{
          window.location.reload();
        }
      )
    }
  } catch (error) {
    mainContainer.innerHTML = Modal(PpoUp("Erro: " + error, "error"));
    mainContainer.querySelector("#closePopUp").addEventListener("click",
      ()=>{
        window.location.reload();
      }
    )
  }
}
