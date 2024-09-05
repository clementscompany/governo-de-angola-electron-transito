import ComponentHome from "../components/ComponentHome.js";
import { Choice, ContentModal, PpoUp, Spinner1, Spinner4 } from "../components/elements.js";
import Menu from "../components/Menu.js";
import SearchBox from "../components/SearchBox.js";
import { API_URL } from "../env.js";
import { ValidateInputs } from "../hooks/Validations.js";
import Settings from "../pages/settings/Settings.js";
import ThemeSystem from "../pages/settings/ThemeSystem.js";
import PasswordInput, { ResultSearch } from "../pages/Users/Cards.js";
import FormUsers from "../pages/Users/FormUsers.js";
import { ListUsers } from "../pages/Users/ListUsers.js";
import NavUsers from "../pages/Users/Nav.js";
import UsersPage from "../pages/Users/Users.js";
class Users{
  constructor(mainContainer){
    this.modal = document.createElement("section");
    this.sessionId = sessionStorage.getItem("session_token");
    this.main = mainContainer;
    this.Init(this.main);
  }

  Init(mainContainer){
    this.Home(mainContainer);
  }
  Methods(mainContainer){
    this.delete = mainContainer.querySelectorAll(".deleteButton");
    this.editButton = mainContainer.querySelectorAll(".editButton");
    this.blockButton = mainContainer.querySelectorAll(".blockButton");
    this.deblockButton = mainContainer.querySelectorAll(".unclockBtn");

    //edit
    this.editButton.forEach((btn) => {
      btn.addEventListener("click", 
        ()=>{
          this.Editar(btn.value, mainContainer);
        }
      )
    });

    //desbloquear
    this.deblockButton.forEach((btn) => {
      btn.addEventListener("click", 
        ()=>{
          this.Desbloquear(btn.value, mainContainer);
        }
      )
    });

    //Bloquear 
    this.blockButton.forEach((btn) => {
      btn.addEventListener("click", 
        ()=>{
          this.Bloquear(btn.value, mainContainer);
        }
      )
    });

    //delete
    this.delete.forEach((btn) => {
      btn.addEventListener("click", 
        ()=>{
          this.Eliminar(btn.value, mainContainer);
        }
      )
    });
  }

  Loading(mainContainer){
    this.modal.classList.add('modalFocus');
    this.modal.innerHTML = Spinner1();
    mainContainer.appendChild(this.modal);
  }

  async Home(mainContainer){
    this.data = await this.GetData(mainContainer);
    if (this.data.ok) {
      mainContainer.innerHTML = ComponentHome("Usuários");
      mainContainer.querySelector("#menu").innerHTML = Menu();
      this.list = mainContainer.querySelectorAll("#listMenu >  li");
      this.list[4].classList.add('active');
      this.list[4].onclick = ()=>{ UsersPage() }
      this.response = await this.data.json();
      mainContainer.querySelector("#recents").innerHTML = ListUsers(this.response);
      mainContainer.querySelector("#searchElement").innerHTML = NavUsers();
      mainContainer.querySelector("#addUserButton").onclick = ()=>{this.Cadastrar(mainContainer)};
      mainContainer.querySelector("#reloadButton").onclick = ()=>{ UsersPage() };
      mainContainer.querySelector("#seatchButton").onclick = ()=>{this.Pesquisar(mainContainer)}
      this.Methods(mainContainer);
      Settings(mainContainer);
      ThemeSystem.changeTheme(mainContainer);
    }
  } 

  Pesquisar(mainContainer){
    mainContainer.querySelector("#cardElements").innerHTML = SearchBox();
    this.searchBox = mainContainer.querySelector("#searchBox");
    this.searchBox.addEventListener("submit", async (e)=>{
      e.preventDefault();
      this.form = e.target;
      this.inputs = this.form.querySelectorAll(".input");
      if (ValidateInputs(this.inputs)) {
        this.Loading(mainContainer);
        this.ListarPesquisas(await this.SearchAdmin(mainContainer, this.inputs[0].value), mainContainer);
      }
    })
    this.searchBox.addEventListener("input", (e)=>{})
  }

  ListarPesquisas(data, mainContainer){
    this.modal.classList.add("modalFocus");
    this.modal.innerHTML = ContentModal(ResultSearch(data));
    mainContainer.appendChild(this.modal);
    this.Methods(mainContainer);
    mainContainer.querySelector("#closeModal").onclick = ()=>{this.CloseLoading(mainContainer)}
  }

  Cadastrar(mainContainer){
    mainContainer.querySelector("#recents").innerHTML = FormUsers();
    this.form = mainContainer.querySelector("#formCadastroUsers");
    this.form.onsubmit =(e)=>{ e.preventDefault(); this.SendFormData(e)}
    this.form.querySelector("#closeButton").onclick = ()=>{ UsersPage() }
  }

  ErrorForm(form, message, status){
    this.textError = form.querySelector("#textError");
    this.textError.innerHTML = message;
    if (status === "sucess") {
      this.textError.classList.replace("error", "sucess") || this.textError.classList.add("sucess");
    } else{
      this.textError.classList.replace("sucess", "error") || this.textError.classList.add("error");
    }  
  }

  async SearchAdmin(mainContainer, data){
    try {
      this.search = await fetch(`${API_URL}/users?search=${data}`,{
        method:"GET",
        headers:{
          "Token-Acces":this.sessionId
        }
      }); if (this.search.ok) {
        this.CloseLoading(mainContainer);
        return await this.search.json();
      } else{
        mainContainer.querySelectorAll(".modalFocus").innerHTML = PpoUp("Erro: " + this.search.statusText, "error");
        mainContainer.querySelector("#closePopUp").onclick = ()=>{window.location.reload()}
      }
    } catch (error) {
      mainContainer.querySelectorAll(".modalFocus").innerHTML = PpoUp("Erro: " + error, "error");
      mainContainer.querySelector("#closePopUp").onclick = ()=>{window.location.reload()}
    }
  }

  async SendFormData(form){
    this.inputs = form.target.querySelectorAll(".input");
    if (ValidateInputs(this.inputs)) {
      this.Loading(this.main);
      try {
        this.send = await fetch(`${API_URL}/users`,{
          method:"POST",
          headers:{
            "Token-Acces":this.sessionId
          },
          body:new FormData(form.target)
        }); if (this.send.ok) {
          this.response = await this.send.json();
          this.CloseLoading(this.main);
          let { sucess, error } = this.response.admin;
          if (sucess) {
            this.ErrorForm(form.target, sucess, "sucess");
          } else{
            this.ErrorForm(form.target, error, "error");
          }
        } else{ this.ErrorForm(form.target, "Erro:" + this.send.statusText, "error"); }
      } catch (error) {
        this.ErrorForm(form.target, "Erro:" + error, "error");
      }
    } else{
      this.ErrorForm(form.target, "Preenha todos os campos", "error");
    }
  }

  async UpdateFormData(form){
    this.inputs = form.target.querySelectorAll(".input");
    if (ValidateInputs(this.inputs)) {
      this.Loading(this.main);
      this.data = {
        "name":this.inputs[0].value,
        "username":this.inputs[1].value,
        "permission":this.inputs[2].value,
        "id":this.inputs[3].value
      }
      try {
        this.send = await fetch(`${API_URL}/users`,{
          method:"PUT",
          headers:{
            "Token-Acces":this.sessionId
          },
          body: JSON.stringify(this.data)
        }); if (this.send.ok) {
          this.response = await this.send.json();
          this.CloseLoading(this.main);
          let { sucess, error } = this.response.admin;
          if (sucess) {
            this.ErrorForm(form.target, sucess, "sucess");
          } else{
            this.ErrorForm(form.target, error, "error");
          }
        } else{ this.ErrorForm(form.target, "Erro:" + this.send.statusText, "error"); }
      } catch (error) {
        this.ErrorForm(form.target, "Erro:" + error, "error");
      }
    } else{
      this.ErrorForm(form.target, "Preenha todos os campos", "error");
    }
  }


  async BloqueteFormData(form){
    this.inputs = form.target.querySelectorAll(".input");
    if (ValidateInputs(this.inputs)) {
      this.FormLoading(form.target);
      this.data = {
        "password":this.inputs[0].value,
        "id":this.inputs[1].value
      }
      try {
        this.send = await fetch(`${API_URL}/blockusers`,{
          method:"PUT",
          headers:{
            "Token-Acces":this.sessionId
          },
          body: JSON.stringify(this.data)
        }); if (this.send.ok) {
          this.response = await this.send.json();
          // this.CloseLoading(this.main);
          let { sucess, error } = this.response.users;
          if (sucess) {
            this.ErrorForm(form.target, sucess, "sucess");
          } else{
            this.ErrorForm(form.target, error, "error");
          }
        } else{ this.ErrorForm(form.target, "Erro:" + this.send.statusText, "error"); }
      } catch (error) {
        this.ErrorForm(form.target, "Erro:" + error, "error");
      }
    } else{
      this.ErrorForm(form.target, "Preenha todos os campos", "error");
    }
  }

  async DeleteFormData(form){
    this.inputs = form.target.querySelectorAll(".input");
    if (ValidateInputs(this.inputs)) {
      this.FormLoading(form.target);
      this.data = {
        "password":this.inputs[0].value,
        "id":this.inputs[1].value
      }
      try {
        this.send = await fetch(`${API_URL}/users`,{
          method:"DELETE",
          headers:{
            "Token-Acces":this.sessionId
          },
          body: JSON.stringify(this.data)
        }); if (this.send.ok) {
          this.response = await this.send.json();
          // this.CloseLoading(this.main);
          let { sucess, error } = this.response.delete;
          if (sucess) {
            this.ErrorForm(form.target, sucess, "sucess");
          } else{
            this.ErrorForm(form.target, error, "error");
          }
        } else{ this.ErrorForm(form.target, "Erro:" + this.send.statusText, "error"); }
      } catch (error) {
        this.ErrorForm(form.target, "Erro:" + error, "error");
      }
    } else{
      this.ErrorForm(form.target, "Preenha todos os campos", "error");
    }
  }

  async DebloqueteFormData(form){
    this.inputs = form.target.querySelectorAll(".input");
    if (ValidateInputs(this.inputs)) {
      this.FormLoading(form.target);
      this.data = {
        "password":this.inputs[0].value,
        "id":this.inputs[1].value
      }
      try {
        this.send = await fetch(`${API_URL}/debloqusers`,{
          method:"PUT",
          headers:{
            "Token-Acces":this.sessionId
          },
          body: JSON.stringify(this.data)
        }); if (this.send.ok) {
          this.response = await this.send.json();
          let { sucess, error } = this.response.users;
          if (sucess) {
            this.ErrorForm(form.target, sucess, "sucess");
          } else{
            this.ErrorForm(form.target, error, "error");
          }
        } else{ this.ErrorForm(form.target, "Erro:" + this.send.statusText, "error"); }
      } catch (error) {
        this.ErrorForm(form.target, "Erro:" + error, "error");
      }
    } else{
      this.ErrorForm(form.target, "Preenha todos os campos", "error");
    }
  }

  async Eliminar(id, mainContainer){
    this.modal.classList.add("modalfocus");
    this.data = await this.GetDataById(id, mainContainer);
    this.modal.innerHTML = Choice(`Pretende Eliminar este Usuário? <br>` + this.data.getId.sucess.nome);
    mainContainer.appendChild(this.modal);
    this.choice = mainContainer.querySelectorAll("#popUpButtons > button");
    this.choice.forEach((button, index)=>{
      button.addEventListener("click", 
        ()=>{
          switch (index) {
            case 0:
              this.CloseLoading(mainContainer);
              this.ConfirmDelete(id, mainContainer)
            break;
          
            default:
              this.CloseLoading(mainContainer);
              break;
          }
        }
      )
    })
  }

  async Bloquear(id, mainContainer){
    this.modal.classList.add("modalfocus");
    this.data = await this.GetDataById(id, mainContainer);
    this.modal.innerHTML = Choice(`Pretende Bloquear este Usuário? <br>` + this.data.getId.sucess.nome);
    mainContainer.appendChild(this.modal);
    this.choice = mainContainer.querySelectorAll("#popUpButtons > button");
    this.choice.forEach((button, index)=>{
      button.addEventListener("click", 
        ()=>{
          switch (index) {
            case 0:
              this.CloseLoading(mainContainer);
              this.ConfirmBlock(id, mainContainer);
            break;
          
            default:
              this.CloseLoading(mainContainer);
              break;
          }
        }
      )
    })
  }

  async Desbloquear(id, mainContainer){
    this.modal.classList.add("modalfocus");
    this.data = await this.GetDataById(id, mainContainer);
    this.modal.innerHTML = Choice(`Pretende Desbloquear este Usuário? <br>` + this.data.getId.sucess.nome);
    mainContainer.appendChild(this.modal);
    this.choice = mainContainer.querySelectorAll("#popUpButtons > button");
    this.choice.forEach((button, index)=>{
      button.addEventListener("click", 
        ()=>{
          switch (index) {
            case 0:
              this.CloseLoading(mainContainer);
              this.ConfirmDeBlock(id, mainContainer);
            break;
          
            default:
              this.CloseLoading(mainContainer);
              break;
          }
        }
      )
    })
  }


  ConfirmBlock(id, mainContainer){
    this.modal.classList.add("modalFocus");
    this.modal.innerHTML = PasswordInput(id);
    mainContainer.appendChild(this.modal);
    this.form = mainContainer.querySelector("#formCadastroUsers");
    this.inputs = this.form.querySelectorAll(".input");
    this.form.querySelector("#closeButton").onclick = ()=>{this.CloseLoading(mainContainer)};
    this.form.addEventListener("submit", (e)=>{
      e.preventDefault();
      this.BloqueteFormData(e);
    })
  }

  ConfirmDeBlock(id, mainContainer){
    this.modal.classList.add("modalFocus");
    this.modal.innerHTML = PasswordInput(id);
    mainContainer.appendChild(this.modal);
    this.form = mainContainer.querySelector("#formCadastroUsers");
    this.inputs = this.form.querySelectorAll(".input");
    this.form.querySelector("#closeButton").onclick = ()=>{this.CloseLoading(mainContainer)};
    this.form.addEventListener("submit", (e)=>{
      e.preventDefault();
      this.DebloqueteFormData(e);
    })
  }

  ConfirmDelete(id, mainContainer){
    this.modal.classList.add("modalFocus");
    this.modal.innerHTML = PasswordInput(id);
    mainContainer.appendChild(this.modal);
    this.form = mainContainer.querySelector("#formCadastroUsers");
    this.inputs = this.form.querySelectorAll(".input");
    this.form.querySelector("#closeButton").onclick = ()=>{this.CloseLoading(mainContainer)};
    this.form.addEventListener("submit", (e)=>{
      e.preventDefault();
      this.DeleteFormData(e);
    })
  }

  Listar(){}
  ListarId(){}

 

  async Editar(id, mainContainer){
    this.data = await this.GetDataById(id, mainContainer);
    if (this.data.getId.sucess) {
      mainContainer.querySelector("#recents").innerHTML = FormUsers(this.data.getId.sucess);
      this.form = mainContainer.querySelector("#formCadastroUsers");
      this.form.querySelector("#closeButton").onclick = ()=>{this.Home(mainContainer)}
      this.inputs = this.form.querySelectorAll(".input");

      this.form.addEventListener("submit", (e)=>{
        e.preventDefault();
        this.UpdateFormData(e);
      })
    } else{
      alert("Houve um erro, tente novamente mais tarde, caso o problema continue, consulte um tecnico para resolver o problema!");
    }
  }

  PopUpModal(mainContainer, message){
    this.modalElement = mainContainer.querySelector(".modalFocus");
    this.modalElement.innerHTML = PpoUp(message, "error");
    this.modalElement.querySelector("#closePopUp").onclick = ()=>{ window.location.reload() }
  }
  Seetings(){}
  ResetPassWord(){}
  SistemError(mainContainer, message){
    this.modal.classList.add('modalFocus');
    this.modal.innerHTML = PpoUp(message, "error");
    mainContainer.appendChild(this.modal);
    mainContainer.querySelector("#closePopUp").onclick = ()=>{ window.location.reload() }
  }
  FormLoading(form){
    form.querySelector(".textError").innerHTML = Spinner4();
  }
  CloseLoading(mainContainer){
    this.modalElement = mainContainer.querySelector(".modalFocus");
    mainContainer.removeChild(this.modalElement);
  }

  async GetDataById(id,mainContainer){
    this.Loading(this.main);
    try {
      this.getData = await fetch(`${API_URL}/users?id=${id}`, {
        method:"GET",
        headers:{
          "Token-Acces":this.sessionId
        }
      }); if (this.getData.ok) {
        this.CloseLoading(this.main);
        return await this.getData.json();
      } else{ this.CloseLoading(mainContainer); this.PopUpModal(mainContainer, this.getData.statusText) }
    } catch (error) { this.PopUpModal(mainContainer, error) }
  }

  async GetData(mainContainer){
    mainContainer.innerHTML = Spinner4();
    try {
      this.getData = await fetch(`${API_URL}/users`, {
        method:"GET",
        headers:{
          "Token-Acces":this.sessionId
        }
      }); if (this.getData.ok) {
        return this.getData;
      } else{ this.SistemError(mainContainer, this.getData.statusText) }
    } catch (error) { this.SistemError(mainContainer, error) }
  }
}
export default  Users;


