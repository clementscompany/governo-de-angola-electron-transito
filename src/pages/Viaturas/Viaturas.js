import { mainContainer } from "../../../renderer.js";
import ComponentHome from "../../components/ComponentHome.js";
import { Choice, Modal, PpoUp, Spinner1, Spinner4 } from "../../components/elements.js";
import Menu from "../../components/Menu.js";
import SearchBox from "../../components/SearchBox.js";
import { API_URL } from "../../env.js";
import Settings from "../settings/Settings.js";
import ThemeSystem from "../settings/ThemeSystem.js";
import CardViatura from "./CardViatura.js";
import FormCadastroViaturas from "./FormViaturas.js";
import TableViaturas from "./TableViaturas.js";

async function Viaturas() {
  Loading();
  const session_id = sessionStorage.getItem("session_token");
  var modalContainer = document.createElement('section');
  try {
    let getData = await fetch(`${API_URL}/viaturas`, {
      method: "GET",
      headers: {
        "Token-Acces": session_id
      }
    })
    if (getData.ok) {
      var dataRecived = await getData.json();
      mainContainer.innerHTML = ComponentHome("Viaturas");
      mainContainer.querySelector("#menu").innerHTML = Menu();
      mainContainer.querySelector("#searchElement").innerHTML = SearchBox();
      Base(dataRecived.viaturas);
      Settings(mainContainer);
      ThemeSystem.changeTheme(mainContainer);

      function Base(data){
        mainContainer.querySelector("#recents").innerHTML = TableViaturas(data);
        mainContainer.querySelector("#addButton").onclick = () => { Cadastrar(); }
        //editButtons
        let editButtons = mainContainer.querySelectorAll("#editButtons");
        editButtons.forEach((edit) => {
          edit.addEventListener("click", () => {
              let filter = dataRecived.viaturas.sucess.filter(e=> {return e.id == edit.value})
              var updateID = edit.value;
              if (filter) {
                Edit(filter, updateID);
              }
            });
          });
        //deleteButtons  
        let deleteButtons = mainContainer.querySelectorAll("#deleteButton");
        deleteButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            var deleteId = btn.value;
            Delete(deleteId);
          })
        })
        //vizualizeButton
        let viewButtons = mainContainer.querySelectorAll("#viewButton");
        viewButtons.forEach((button) => {
          button.addEventListener("click", async () => {
            mainContainer.querySelector("#recents").innerHTML = Spinner4();
            let id = button.value;
            try {
              let getViatura = await fetch(`${API_URL}/viaturas?id=${id}`, {
                method: "GET",
                headers: { "Token-Acces": session_id }
              });
              if (getViatura.ok) {
                let data = await getViatura.json();
                if (data.result.sucess) {
                  Visualizar(data.result.sucess);
                } else {
                  recent.innerHTML = PpoUp("Erro: " + data.result.error);
                  mainContainer.querySelector("#closePopUp").onclick = () => { Viaturas() }
                }
              } else {
                mainContainer.innerHTML = Modal(PpoUp("Erro: " + getViatura.statusText));
                mainContainer.querySelector("#closePopUp").onclick = () => { window.location.reload(true) }
              }
            } catch (error) {
              mainContainer.innerHTML = Modal(PpoUp("Erro: " + error));
              mainContainer.querySelector("#closePopUp").onclick = () => { window.location.reload(true) }
            }
          })
        });

        //pesquisar/
        let reloadButton = mainContainer.querySelector("#reloadButton");
        reloadButton.addEventListener("click", Viaturas);

        let box = mainContainer.querySelector("#searchBox");
        box.addEventListener("submit", async (e)=>{
          e.preventDefault();
          let input = box.querySelector("input");
          if (input.value.trim() !== "") {
            let searchData = await fetch(`${API_URL}/searchviaturas?data=${input.value}`, {
              method:"GET",
              headers:
              {
                "Token-Acces":session_id
              }
            });
            if (searchData.ok) {
              let data = await searchData.json();
              if (data.result.sucess) {
                Base(data.result);
              } else{
                let resultSearch = mainContainer.querySelector("#resultSearch");
                resultSearch.innerHTML = data.result.error;
                resultSearch.style.color = "red";
              }
            }
          }
        });

      } //

      /// editar ou atualizar viaturas
      function Edit(filter,updateID) {
        mainContainer.querySelector("#contentElements").innerHTML = FormCadastroViaturas(filter);
        let form = mainContainer.querySelector("#formCadastroViaturas");
        form.querySelector("#closeButton").onclick = ()=>{Viaturas()};
        let textError = mainContainer.querySelector("#textError");
        form.addEventListener("submit", async (e)=>{
          e.preventDefault();
          let isValid = true;
          let inputs = form.querySelectorAll("input");
          inputs.forEach((input)=>{
            if (input.value.trim() === "") {
              isValid = false;
            } 
            input.addEventListener("input", ()=>{
              textError.innerHTML  = "";
            })
          })
          if (isValid) {
            let updateData = {
              id:updateID,
              marca:inputs[0].value,
              modelo:inputs[1].value,
              tipo:inputs[2].value,
              matricula:inputs[3].value
            };
            try {
              let sendUpdate = await fetch(`${API_URL}/viaturas`, {
                method:"PUT",
                headers:{
                  "Token-Acces":session_id
                },
                body:JSON.stringify(updateData)
              });
              if (sendUpdate.ok) {
                let data = await sendUpdate.json();
                if(data.update.sucess){
                  textError.innerHTML = data.update.sucess;
                  textError.classList.replace("error", "sucess") || textError.classList.add("sucess");
                } else{
                  textError.innerHTML = data.update.error;
                  textError.classList.replace("error", "sucess") || textError.classList.add("sucess");
                }
              } else{
                mainContainer.appendChild(modalContainer);
                modalContainer.classList.add('modalFocus');
                modalContainer.innerHTML = PpoUp("Erro: " + sendUpdate.statusText, "error");
                mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
                  window.location.reload();
                });
              }
            } catch (error) {
              mainContainer.appendChild(modalContainer);
              modalContainer.classList.add('modalFocus');
              modalContainer.innerHTML = PpoUp("Erro: " + error, "error");
                mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
                  window.location.reload();
                });
            }
          } else{
            textError.innerHTML = "Preencha todos os campos!";
            textError.classList.replace("sucess", "error") || textError.classList.add("error");
          }
        })
      }


      //Eliminar viatura:id
      function Delete(deleteId){
        modalContainer.innerHTML = Choice("Tem certeza que pretende eliminar estes dados?");
        modalContainer.classList.add('modalFocus')
        mainContainer.appendChild(modalContainer);
        let option = mainContainer.querySelectorAll("#popUpButtons > button");
        option.forEach((optButton, index) => {
          optButton.addEventListener("click", async () => {
            switch (index) {
              case 0: //
                modalContainer.innerHTML = Spinner1();
                try {
                  let deleteData = await fetch(`${API_URL}/viaturas`, {
                    method: "DELETE",
                    headers: {
                      "Token-Acces": session_id
                    },
                    body: JSON.stringify({ id: deleteId })
                  });
                  if (deleteData.ok) {
                    let data = await deleteData.json();
                    if (data.delete.sucess) {
                      modalContainer.innerHTML = PpoUp(data.delete.sucess,
                        "sucess"
                      )
                      mainContainer.querySelector("#closePopUp").onclick = () => {
                        Viaturas();
                      }
                    } else {
                      modalContainer.innerHTML = PpoUp(data.delete.error,
                        "error"
                      )
                      mainContainer.querySelector("#closePopUp").onclick = () => {
                        Viaturas();
                      }
                    }
                  } else {
                    modalContainer.innerHTML = PpoUp("Erro: " + deleteData.statusText);
                    mainContainer.querySelector("#closePopUp").onclick = () => {
                      Viaturas();
                    }
                  }
                } catch (error) {
                  modalContainer.innerHTML = PpoUp("Erro: " + error);
                  mainContainer.querySelector("#closePopUp").onclick = () => {
                    window.location.reload();
                  }
                }
                break; 

              case 1:
                modalContainer.innerHTML = "";
                mainContainer.removeChild(modalContainer);
                break;
            }
          })
        })
      }

      ///visualizar
      function Visualizar(data){
        let recent = mainContainer.querySelector("#recents");
        recent.innerHTML = CardViatura(data);
        recent.querySelector("#closeButton").addEventListener("click", Viaturas);
      }
      ///cadastrar viaturas
      function Cadastrar(){
        mainContainer.querySelector("#contentElements").innerHTML = FormCadastroViaturas();
        let form = mainContainer.querySelector("#formCadastroViaturas");
        form.querySelector("#closeButton").addEventListener("click", Viaturas);

        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          let inputs = e.target.querySelectorAll("input");
          let isValid = true;
          let textError = mainContainer.querySelector("#textError");
          inputs.forEach(input => {
            if (input.value.trim() === "") {
              isValid = false;
            }
            input.addEventListener("input", () => {
              textError.innerHTML = "";
              textError.classList.remove('error');
            })
          });
          if (isValid) {
            try {
              textError.innerHTML = Spinner4();
              let formData = new FormData(form);
              let sendData = await fetch(`${API_URL}/viaturas`, {
                method: "POST",
                headers: {
                  "Token-Acces": session_id
                },
                body: formData
              });
              if (sendData.ok) {
                let data = await sendData.json();
                if (data.viaturas.sucess) {
                  textError.innerHTML = data.viaturas.sucess;
                  textError.classList.replace('error', "sucess") || textError.classList.add('sucess');
                } else {
                  textError.innerHTML = data.viaturas.error;
                  textError.classList.replace('sucess', "error") || textError.classList.add('error');
                }
              } else {
                textError.innerHTML = sendData.statusText;
                textError.classList.add('error');
              }
            } catch (error) {
              textError.innerHTML = error;
              textError.classList.add('error');
            }
          } else {
            textError.innerHTML = `<span>Peencha todos os campos!</span>`;
            textError.classList.add('error');
          }
        });
      }

    } else {
      mainContainer.innerHTML = Modal(PpoUp(getData.statusText));
      mainContainer.querySelector("#closePopUp").onclick = () => { window.location.reload() };
    }
  } catch (error) {
    mainContainer.innerHTML = Modal(PpoUp(error));
    mainContainer.querySelector("#closePopUp").onclick = () => { window.location.reload() };
  }




  let nav = mainContainer.querySelectorAll("#listMenu > li");
  nav[1].classList.add('active');
  nav[1].addEventListener("click", Viaturas);
  function Loading() {
    mainContainer.innerHTML = Modal(Spinner4());
  }


}
export default Viaturas;