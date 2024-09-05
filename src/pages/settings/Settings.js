import { Navigate } from "../../../router.js";
import { Choice, PpoUp, Spinner1 } from "../../components/elements.js";
import { API_URL } from "../../env.js";
import { MessageFormError, ValidateInputs } from "../../hooks/Validations.js";
import PasswordInput from "../Users/Cards.js";
import SeetingsPage from "./SeettingPage.js";

export default async function Settings(mainContainer){  
  mainContainer.querySelector("#menuButtonPerson").addEventListener("click", async ()=>{
    const sessionId = sessionStorage.getItem("session_token");
    let getData = await fetch(`${API_URL}/auth`, {
      method:"GET",
      headers:{
        "Token-Acces":sessionId
      }
    });
    if (!getData.ok) {
      Navigate("/login");
    }
    var data = await getData.json()
    
    const Modal = document.createElement("section");
    const conainer = document.createElement("div");
    conainer.innerHTML  = SeetingsPage(data.auth.sucess);
    mainContainer.appendChild(conainer);
    mainContainer.querySelector("#sessionEnd").onclick = ()=>{
      Modal.classList.add("modalFocus");
      Modal.innerHTML = Choice("Tem Certeza que deseja terminar a sessao?");
      mainContainer.appendChild(Modal);
      let btn = mainContainer.querySelectorAll("#popUpButtons > button");
      btn.forEach((button, index) => {
        button.addEventListener("click", ()=>{
          switch(index){
            case 0 :
              Logout();
            break;
            
            case 1 : 
              mainContainer.removeChild(conainer);
              mainContainer.removeChild(Modal);
            break;
          }
        })
      });
      
    };
    async function Logout(){
      Modal.innerHTML = Spinner1();
      try {
        let logoutData =  await fetch(`${API_URL}/logout`, {
          method:"PUT",
          headers:{
            "Token-Acces":sessionId
          }
        }); if (logoutData.ok) {
            let data = await logoutData.json();
            if (data.logout.sucess) {
                sessionStorage.removeItem("session_token");
                sessionStorage.clear();
                Navigate("/login");
            } else{
              Modal.innerHTML = PpoUp("Erro ao terminar a sessao!" + data.logout.error, "error");
              mainContainer.querySelector("#closePopUp").addEventListener("click",()=>{
                window.location.reload();
              })
            }
        } else{
          Modal.innerHTML = PpoUp("Erro ao terminar a sessao!" + logoutData.statusText, "error");
          mainContainer.querySelector("#closePopUp").addEventListener("click",()=>{
            window.location.reload();
          })
        }

      } catch (error) {
        Modal.innerHTML = PpoUp("Erro ao terminar a sessao! " + error, "error");
        mainContainer.querySelector("#closePopUp").addEventListener("click",()=>{
          window.location.reload();
        })
      }
    }
    ///close
    mainContainer.querySelector("#closeContainer").onclick = ()=>{
      mainContainer.removeChild(conainer);
    };
    //updatePass
    mainContainer.querySelector("#updatePassword").addEventListener("click", ()=>{
      Modal.classList.add("modalFocus");
      Modal.innerHTML = Choice("Deseja restaurar a sua senha?");
      mainContainer.appendChild(Modal);

      let btn = mainContainer.querySelectorAll("#popUpButtons > button");
      btn.forEach((button, index) => {
        button.addEventListener("click", ()=>{
          switch(index){
            case 0 :
              ResetPass();
            break;
            
            case 1 : 
              mainContainer.removeChild(conainer);
              mainContainer.removeChild(Modal);
            break;
          }
        })
      });
      
      function ResetPass(){
        Modal.innerHTML = PasswordInput("1233");
        var form = mainContainer.querySelector("#formCadastroUsers");
        var inputs = form.querySelectorAll(".input");

        form.addEventListener("submit", async (e)=>{
          e.preventDefault();
          if (ValidateInputs(inputs)) {
            try {
              let resetPass = await fetch(`${API_URL}/reset`, {
                method:"PUT",
                body:JSON.stringify({"password":inputs['0'].value}),
                headers:{
                  "Token-Acces":sessionId
                }
              })
              if (resetPass.ok) {
                let data = await resetPass.json();  
                if (data.reset.sucess) {
                  Modal.innerHTML = PpoUp(data.reset.sucess, "sucess");
                  mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
                    mainContainer.removeChild(Modal);
                  })
                } else{
                  form.querySelector("#textError").innerHTML = data.reset.error;
                }
              }
            } catch (error) {
              Modal.innerHTML = PpoUp("Erro ao Restaurar a senha! " + error, "error");
              mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
                window.location.reload();
              })
            }
          } else{
            MessageFormError(form);
          }
        })
      }
      
    })
  })  
}

