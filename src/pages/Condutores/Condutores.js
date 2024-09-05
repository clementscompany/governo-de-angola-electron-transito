import { mainContainer } from "../../../renderer.js";
import ComponentHome from "../../components/ComponentHome.js";
import { AutoClick, Choice, ContentModal, Modal, PpoUp, Spinner1, Spinner4 } from "../../components/elements.js";
import Menu from "../../components/Menu.js";
import SearchBox from "../../components/SearchBox.js";
import { API_ANGOLA_BI, API_URL } from "../../env.js";
import Settings from "../settings/Settings.js";
import ThemeSystem from "../settings/ThemeSystem.js";
import ManualForm, { CardFormUsr, CardUser } from "./Cards.js";
import FormCondutores from "./FormCondutores.js";
import TableCondutores from "./TableContutores.js";
export default async function Condutores()
{
  mainContainer.innerHTML = Modal(Spinner4());
  const modalContainer = document.createElement('section');
  const session_id = sessionStorage.getItem("session_token");
  modalContainer.classList.add('modalFocus');
  try {
    let getCondutores = await fetch(`${API_URL}/condutores`, 
      {
        method:"GET",
        headers:
        {
          "Token-Acces":session_id
        }
      }
    ); if (getCondutores.ok) {
      var condData = await getCondutores.json();
      mainContainer.innerHTML = ComponentHome("Condutores");
      mainContainer.querySelector("#menu").innerHTML = Menu();
      mainContainer.querySelector("#searchElement").innerHTML = SearchBox();
      let listMenu = mainContainer.querySelectorAll("#listMenu > li");
      listMenu[2].classList.add('active');
      listMenu[2].addEventListener("click", Condutores);
      Settings(mainContainer);
      ThemeSystem.changeTheme(mainContainer);
      Base(condData.data);

      function Base(data){
        mainContainer.querySelector("#recents").innerHTML = TableCondutores(data);
        let addButton =  mainContainer.querySelector("#addButton");
        let viewButton =  mainContainer.querySelectorAll("#viewButton");
        let deleteButton = mainContainer.querySelectorAll("#deleteButton");
        let searchBox = mainContainer.querySelector("#searchBox");

        searchBox.addEventListener("submit",
          (e)=>{
            e.preventDefault();
            let input = searchBox.querySelector("input");
            if (input.value.trim() !== "") {
              Pesquisar(input.value);
            }
          }
        )

        deleteButton.forEach((button)=>
          {
            button.addEventListener("click",
              ()=>{
                Eliminar(button.value);
              }
            ) 
          }
        )
        viewButton.forEach(button=>{
          button.addEventListener("click", ()=>{
            Buscar(button.value);
          })
        })
        addButton.addEventListener("click", ()=>{
          Cadastrar();
        })

        async function Buscar(id){
          mainContainer.appendChild(modalContainer);
          modalContainer.innerHTML = Spinner1();
          if (id) {
            try{
              let getData = await fetch(`${API_URL}/condutores?id=${id}`,
                {
                  method:"GET",
                  headers:{
                    "Token-Acces":session_id
                  }
  
                }
              );
              if (getData.ok) {
                let data = await getData.json();
                let { result } = data;
                if (result.sucess) {
                  modalContainer.innerHTML = ContentModal(CardUser(result.sucess));
                  mainContainer.querySelector("#closeModal").addEventListener("click", 
                    ()=>{
                      closeModal();
                    }
                  );
                }else{
                  setError(result.error, "error");
                }
              }
            } catch(error){
              setError("erro: "+ error, "error");
            }
          }
          function setError(message, status){
            modalContainer.innerHTML = PpoUp(message, status);
            mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
              closeModal();
            })
          }
          function closeModal(){
            mainContainer.removeChild(modalContainer);
            modalContainer.innerHTML = "";
          }
        }
  
        function Cadastrar(){
          mainContainer.querySelector("#contentElements").innerHTML = FormCondutores();
          let form = mainContainer.querySelector("#formCadastroViaturas");
          let textError = mainContainer.querySelector("#textError");
          let closeButton = form.querySelector("#closeButton");
          closeButton.addEventListener("click", ()=>{ Condutores(); })
          form.addEventListener("submit", async (e)=>{
            e.preventDefault();
            let input = form.querySelectorAll("input");
            if (input[0].value.trim()!== "") {
              textError.innerHTML = Spinner4();
              try {
                let checkBI = await fetch(`${API_ANGOLA_BI}?bi=${input[0].value}`, {method:"GET"});
                if (checkBI.ok) {
                  let data = await checkBI.json();
                  if (data.sucess === true) {
                    textError.innerHTML = CardFormUsr(data.data);
                    let dados = {
                      nome: data.data.nome,
                      naturalidade: data.data.naturalidade,
                      genero: data.data.genero,
                      pai_nome_completo: data.data.pai_nome_completo,
                      mae_nome_completo: data.data.mae_nome_completo,
                      estado_civil: data.data.estado_civil,
                      data_nasc: data.data.data_nasc,
                      bilhete:data.data.numero,
                      telefone: input[1].value
                  };
                  mainContainer.querySelector("#registerButton").addEventListener("click", ()=>{
                    EnviarDados(dados)
                  });
                  } else {
                    textError.innerHTML = AutoClick(data.error.message);
                    textError.classList.replace("sucess", "error") || textError.classList.add("error")
                    mainContainer.querySelector("#autoClick").addEventListener("click", ()=>{
                      ManualRegister();
                    })
                  }
                }
              } catch (error) {
                textError.innerHTML = AutoClick(error);
                textError.classList.replace("sucess", "error") || textError.classList.add("error");
                mainContainer.querySelector("#autoClick").addEventListener("click", ()=>{
                  ManualRegister();
                })
              }
            } else{
              textError.innerHTML = "Preencha os ocampos!";
              textError.classList.replace("sucess", "error") || textError.classList.add("error");
            }
          })
        }
        
        async function EnviarDados(dados) {
          mainContainer.appendChild(modalContainer);
          modalContainer.innerHTML = Spinner1();
          try {
            let sendData = await fetch(`${API_URL}/condutores`,
              {
                method: "POST",
                headers:
                {
                  "Token-Acces": session_id
                },
                body: JSON.stringify(dados)

              }
            );
            if (sendData.ok) {
              let data = await sendData.json();
              let { condutores } = data 
              let { error, sucess } = condutores;
              if (error) {
                ErrorModal(error, "error");
              } else{
                ErrorModal(sucess, "sucess");
              }
            } else {
              ErrorModal(sendData.statusText, "error")
            }
          } catch (error) {
            ErrorModal(error, "error");
          }
          function ErrorModal(message, ststus){
            modalContainer.innerHTML = PpoUp(message, ststus);
            mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
              modalContainer.innerHTML = "";
              mainContainer.removeChild(modalContainer);
            })
          }
        }

        function ManualRegister() {
          mainContainer.querySelector("#contentElements").innerHTML = ManualForm();
          let form = mainContainer.querySelector("#formAutoClick");
          let inputs = form.querySelectorAll("input");
          let closeButton = form.querySelector("#closeButton");
          let isValid = true;

          closeButton.addEventListener("click", ()=>{ Condutores(); })
      
          form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            inputs.forEach((input) => {
              if (input.value === "") { 
                isValid = false;
                input.style.border = "1px solid #fd373757";
              }
      
              input.addEventListener("input", () => {
                input.style.border = "1px solid #80808036";
                isValid = true;
              });
            });
              if (isValid) {
                try {
                  let formData = new FormData(form);
                  let sendData = await fetch(`${API_URL}/condutores`, {
                    method: "POST",
                    headers: {
                      "Token-Acces": session_id,
                    },
                    body: formData,
                  });
        
                  if (sendData.ok) {
                    let data = await sendData.json();
                    let { result } = data;
                    if (result.sucess) {
                      sucessModal(result.sucess, "sucess");
                    } else{
                      ErrorModal(result.error, "error");
                    }
                  } else {
                    ErrorModal("Erro: " + sendData.statusText, "error");
                  }
                } catch (error) {
                  ErrorModal("Erro: " + error, "error");
                }
              } else {
                ErrorModal("Preencha todos os campos!", "error");
              }
            });
      
        
          function ErrorModal(message, status) { 
            modalContainer.innerHTML = PpoUp(message, status); 
            mainContainer.appendChild(modalContainer);
            mainContainer.querySelector("#closePopUp").addEventListener("click", () => {
              modalContainer.innerHTML = "";
              mainContainer.removeChild(modalContainer);
            });
          }

          function sucessModal(message, status) { 
            modalContainer.innerHTML = PpoUp(message, status); 
            mainContainer.appendChild(modalContainer);
            mainContainer.querySelector("#closePopUp").addEventListener("click", () => {
              modalContainer.innerHTML = "";
              mainContainer.removeChild(modalContainer);
              Condutores();
            });
          }
        }
        


        //eliminar dados 
        function Eliminar(id){
          mainContainer.appendChild(modalContainer);
          // modalContainer.innerHTML = Spinner1();
          if (id) {
            modalContainer.innerHTML = Choice("Tem certeza que deseja eliminar estes dados?");
            let popUpButtons = mainContainer.querySelectorAll("#popUpButtons > button");
            popUpButtons.forEach((button, index)=>
              {
                button.addEventListener("click", 
                  async ()=>{
                    switch (index) 
                    {
                      case 0:
                        try{
                          let deleteData = await fetch(`${API_URL}/condutores`,
                            {
                              method:"DELETE",
                              headers:{
                                "Token-Acces":session_id
                              }, 
                              body:JSON.stringify({id:id})
                            }
                          );
                          if (deleteData.ok) {
                            let data = await deleteData.json();
                            let { result } = data;
                            if (result.sucess) {
                              sucessMessage(result.sucess, "sucess");
                            } else{
                              Message("Erro: " +result.error, "error");
                            }
                          } else{
                           Message("Erro: " +deleteData.statusText, "error");
                          }
                        } catch(error){
                          Message("Erro: " +error, "error");
                        }
                      break;
                        
                      case 1:
                        closeModal();
                      break;
                    }
                  }
                )
              }
            )

          }
          function sucessMessage(message, status){
            mainContainer.appendChild(modalContainer);
            modalContainer.innerHTML = PpoUp(message, status);
            mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
              Condutores();
            })
          }
          function Message(message, status){
            mainContainer.appendChild(modalContainer);
            modalContainer.innerHTML = PpoUp(message, status);
            mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
              closeModal();
            })
          }
          function closeModal(){
            mainContainer.removeChild(modalContainer);
            modalContainer.innerHTML = "";
          }
        }//end 
  
        async function Pesquisar(data){
          mainContainer.appendChild(modalContainer);
          modalContainer.innerHTML = Spinner1();
          try {
            let search = await fetch(`${API_URL}/searchcondutores?search=${data}`,
              {
                method:"GET",
                headers:{
                  "Token-Acces":session_id
                }
              }
            ); if (search.ok) {
              closeModal();
              let data = await search.json();
              let result  = data.search;
              mainContainer.querySelector("#recents").innerHTML = TableCondutores(result);
              let addButton =  mainContainer.querySelector("#addButton");
              let viewButton =  mainContainer.querySelectorAll("#viewButton");
              let deleteButton = mainContainer.querySelectorAll("#deleteButton");
              deleteButton.forEach((button)=>
                {
                  button.addEventListener("click",
                    ()=>{
                      Eliminar(button.value);
                    }
                  ) 
                }
              )
              viewButton.forEach(button=>{
                button.addEventListener("click", ()=>{
                  Buscar(button.value);
                })
              })
              addButton.addEventListener("click", ()=>{
                Cadastrar();
              })
            } else{
              Message("Erro: " + search.statusText, "error");
            }
          } catch (error) {
            Message("Erro: " +error, "error");
          }
          function Message(message, status){
            modalContainer.innerHTML = PpoUp(message, status);
            mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
              closeModal();
            })
          }
          function closeModal(){
            mainContainer.removeChild(modalContainer);
            modalContainer.innerHTML = "";
          }
        }
      }

    } else{
      mainContainer.innerHTML = PpoUp("Erro: " + getCondutores.statusText, "error");
      mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{window.location.reload()})
    }
  } catch (error) {
    mainContainer.innerHTML = PpoUp("Erro: " + error, "error");
    mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{window.location.reload()})
  }
}