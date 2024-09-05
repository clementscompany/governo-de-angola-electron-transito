import { mainContainer } from "../../renderer.js";
import { API_URL } from "../env.js";
import ComponentLogin from "../components/ComponentLogin.js";
import { FormPassword, Modal, PpoUp, Spinner1, Spinner4 } from "../components/elements.js";
import { Navigate } from "../../router.js";
async function LoginPage() {
    mainContainer.innerHTML = Spinner4();
    try {
        let getData = await fetch(`${API_URL}/login`, {method:"GET"})
        if (getData.ok) {
            let data = await getData.json();
            if (data.username.sucess) {
                mainContainer.innerHTML = ComponentLogin(data.username.sucess);
                CheckLogin()
            } 
        } else{
            mainContainer.innerHTML = Modal(PpoUp("Erro no servidor: "+getData.statusText, "error"));
            mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
              window.location.reload();
            })
        }
    } catch (error) {
      console.error("erro: " + error);
      mainContainer.innerHTML = Modal(PpoUp(getData.statusText, "error"));
      mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
        window.location.reload();
      })
    }
}

async function CheckLogin(params) {
    let formData = mainContainer.querySelector("#loginFormData");
    formData.addEventListener("submit", (e)=>{
        e.preventDefault();
    })
    formData.querySelector("#username").addEventListener("change", async (e)=>{
        let dataUsername = e.target.value;
        if (dataUsername) {
            openLoad();
            var textError = formData.querySelector(".textError");
            try{
                let getData = await fetch(`${API_URL}/checkusername?username=${dataUsername}`,{
                    method:"GET",
                })
                if (getData.ok) {
                    CloseLoad();
                    let data = await getData.json();
                    let response = data.check;
                    if (response.sucess === true) {
                        openFormData();
                        formData.querySelector("#logButton").addEventListener("click", async ()=>{
                            let passwordInput = formData.querySelector("#passwordInput");
                            if (passwordInput.value.trim() == "" || null) {
                                textError.innerHTML = "Digite a sua senha!";
                                passwordInput.classList.add('error');
                            } else{
                                textError.innerHTML = Spinner1();
                                try {
                                    let form = new FormData(formData);
                                    let sendData = await fetch (`${API_URL}/authlogin`, {
                                        method:"POST",
                                        body:form
                                    });
                                    if (sendData.ok) {
                                        let data = await sendData.json()
                                        if (data.login.sucess) {
                                            textError.innerHTML = data.login.sucess;
                                            sessionStorage.setItem("session_token", data.login.token);
                                            Navigate("/home");
                                        } else{
                                            textError.innerHTML = data.login.error;
                                        }
                                    } else{
                                        ErrorSchema("Hoive um erro: " + sendData.statusText);
                                    }
                                } catch (error) {
                                    ErrorSchema("Hoive um erro: " + error);
                                }
                            }
                        })
                    } else{
                        setPassword(dataUsername);
                    }
                } else{
                    ErrorSchema("Erro no sistema: "+ getData.statusText, "error");
                }
            } catch(error){
                ErrorSchema("Erro ao processar os dados: "+ error, "error");
            }
        } 
    });
}
function setPassword(username) {
    mainContainer.innerHTML = Modal(FormPassword());
    let inputs = mainContainer.querySelectorAll(".inputBox > input");
    inputs[1].addEventListener("input", ()=>{
        if (inputs[0].value == "") {
            inputs.forEach(element=> element.classList.add('error'));
            mainContainer.querySelector(".textError").innerHTML = "Preencha todos os campos!";
        } else{
            mainContainer.querySelector(".textError").innerHTML = "Confirme a sua senha!";
            inputs.forEach(element=> element.classList.remove('error'));
        }
    });
    mainContainer.querySelector("#cancelButton").addEventListener("click", ()=>{
        LoginPage();
    })

    mainContainer.querySelector("#eyeButton").addEventListener("click", ()=>{

        if (inputs[0].type == "password" && inputs[1].type == "password") {
            inputs[0].type = "text";
            inputs[1].type = "text";
            mainContainer.querySelector("#eyeButton").innerHTML = `<i class="bi bi-eye-fill"></i>`;
        } else{
            inputs[0].type = "password";
            inputs[1].type = "password";
            mainContainer.querySelector("#eyeButton").innerHTML = `<i class="bi bi-eye-slash-fill"></i>`;
        }
    })
    mainContainer.querySelector("#logButton").addEventListener("click", async ()=>{
        let textError =  mainContainer.querySelector(".textError");
        textError.innerHTML = Spinner1();
        if (inputs[0].value === inputs[1].value) {
            try {
                let sendData = await fetch(`${API_URL}/setpassword`, {
                    method:"POST",
                    headers:{
                        "conttent-type":"application/json"
                    },
                    body:JSON.stringify({"password":inputs[1].value, "username":username})
                });
                if (sendData.ok) {
                 let data = await sendData.json();
                    if (data.check.sucess) {
                        textError.innerHTML = data.check.sucess;
                        setTimeout(() => { LoginPage(); }, 3000);
                    } else{
                        textError.innerHTML = data.check.error;
                    }
                } else{
                    ErrorSchema("Erro inesperado! " + sendData.statusText, "error");
                }
            } catch (error) {
                ErrorSchema("Erro inesperado! " + error, "error");
            }
        } else{
            mainContainer.querySelector(".textError").innerHTML = "Confirme a sua senha!";
            inputs.forEach(inp=> inp.classList.add('error'));
        }
    })
}

function  openFormData(params) {
    mainContainer.querySelector("#logButton").classList.add('active');
    mainContainer.querySelector(".passwordBox").classList.add('active');
}


function openLoad(){
    let textError = mainContainer.querySelector(".textError");
    textError.innerHTML = Spinner1();
}
function CloseLoad(){
    let textError = mainContainer.querySelector(".textError");
    textError.innerHTML = "Insira seus dados de acesso!";
}
function ErrorSchema(message, status) {
    mainContainer.innerHTML = Modal(PpoUp(message, status));
    mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{LoginPage()});
    
}
export default LoginPage;