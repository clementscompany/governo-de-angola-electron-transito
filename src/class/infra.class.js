import { Choice, ContentModal, PpoUp, Spinner1, Spinner4 } from "../components/elements.js";
import { API_URL } from "../env.js";
import { ValidateInputs } from "../hooks/Validations.js";
import TopCardInfra, { ResultSearch, ViewInfra } from "../pages/Infracoes/CardsInfra.js";
import FormInfracoes from "../pages/Infracoes/FormInfracoes.js";
import Infracoes from "../pages/Infracoes/Infracoes.js";

class Infra {
  constructor() {
    this.sessionId = sessionStorage.getItem("session_token");
    this.modal = document.createElement('section');
    this.loader = Spinner4();
  }

  ListById(mainContainer){
    this.result = mainContainer.querySelectorAll(".getResult");
    this.result.forEach((list)=>{
      list.addEventListener("click", async ()=>{
      this.data = await this.GetById(list.id)
        if (this.data.result.sucess) {
          this.ListModal(mainContainer,this.data.result.sucess);
        }
      });
    })
  }

  ListModal(mainContainer, data){
    this.modal.innerHTML = ContentModal(ViewInfra(data));
    this.editButton = this.modal.querySelectorAll(".editInfraBtn");
    this.editButton.forEach((editar)=>{
      editar.addEventListener("click", ()=>{
        this.Editar(mainContainer, editar.value);
      })
    })
    this.deleteButton = this.modal.querySelector(".deleteButton");
    this.deleteButton.addEventListener("click", ()=>{
      this.DeleteOnModal(mainContainer, this.deleteButton.value);
    })
    this.updateButton = this.modal.querySelector(".selectStatus");
    this.updateButton.addEventListener("change", ()=>{
      this.RemoveChild(mainContainer);
      this.AtualizarStatus(mainContainer, this.updateButton.value, this.updateButton.id);
    })
    this.modal.querySelector("#closeModal").addEventListener("click", ()=>{
      this.RemoveChild(mainContainer);
    });
  }


  ListOutModal(mainContainer, data){
    this.modal.classList.add('modalFocus');
    mainContainer.appendChild(this.modal);
    this.modal.innerHTML = ContentModal(ViewInfra(data));
    this.editButton = this.modal.querySelectorAll(".editInfraBtn");

    this.editButton.forEach((editar)=>{
      editar.addEventListener("click", ()=>{
        this.Editar(mainContainer, editar.value);
      })
    })
    this.deleteButton = this.modal.querySelector(".deleteButton");
    this.deleteButton.addEventListener("click", ()=>{
      this.DeleteOnModal(mainContainer, this.deleteButton.value);
    })
    this.updateButton = this.modal.querySelector(".selectStatus");
    this.updateButton.addEventListener("change", ()=>{
      this.RemoveChild(mainContainer);
      this.AtualizarStatus(mainContainer, this.updateButton.value, this.updateButton.id);
    })
    this.modal.querySelector("#closeModal").addEventListener("click", ()=>{
      this.RemoveChild(mainContainer);
    });
  }

  DeleteOnModal(mainContainer,id){
    this.RemoveChild(mainContainer);
    this.modal.classList.add("modalFocus");
    this.modal.innerHTML = Choice("Tem certeza que deseja eliminar?");
    this.choiceButtos = this.modal.querySelectorAll(".choiceBtn");
    mainContainer.appendChild(this.modal);

    this.choiceButtos.forEach((button, index)=>{
      button.addEventListener("click", async ()=>{
        switch (index) {
          case 0:  
          let message = await this.DeleteHook(mainContainer,id);
          let { sucess, error } = message.result; 
          if (sucess) {
            this.ReloadMessage(mainContainer, sucess, "sucess");
          } else{
            this.ReloadMessage(mainContainer, error, "error");
          }
          break;
          default:
            this.RemoveChild(mainContainer);
          break;
        }
      })
    })
  }


  async DeleteHook(mainContainer,id){
    this.modal.innerHTML = Spinner1();
    try {
      this.sendDelete = await fetch(`${API_URL}/infracoes`,{
        method:"DELETE",
        headers:{ "Token-Acces":this.sessionId },
        body:JSON.stringify({ id:id })
      });  if (this.sendDelete.ok) {
          this.response = await this.sendDelete.json();
          this.RemoveChild(mainContainer);
          return this.response;
      } else{ 
        this.modal.innerHTML = PpoUp("Erro: " + this.sendDelete.statusText, "error");
        mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
          window.location.reload();
        })  
      }
    } catch (error) {
      this.modal.innerHTML = PpoUp("Erro: " + error, "error");
      mainContainer.querySelector("#closePopUp").addEventListener("click", ()=>{
        window.location.reload();
      })
    }
  }

  async Pesquisar(form, mainContainer) {
    this.input = form.target.querySelector("input");
    this.errorCard = mainContainer.querySelector("#resultSearch");
    this.modal.classList.add('modalFocus');
    this.input.addEventListener("input", () => { this.errorCard.innerHTML = ""; })
    if (this.input.value.trim() !== "") {
      this.modal.innerHTML = Spinner1()
      mainContainer.appendChild(this.modal);

      try {
        this.searchData = await fetch(`${API_URL}/infracoes?search=${this.input.value}`, {
          method: "GET",
          headers: {
            "Token-Acces": this.sessionId
          }
        });
        if (this.searchData.ok) {
          this.result = await this.searchData.json();
          let { sucess, error, detail } = this.result.search
          if (error) {
            this.RemoveChild(mainContainer);
            this.errorCard.innerHTML = error;
            this.errorCard.style.color = "red";
          } else {
            this.modal.innerHTML = ContentModal(ResultSearch(sucess, detail));
            this.ListById(mainContainer);
            this.modal.querySelector("#closeModal").addEventListener("click", () => {
              this.RemoveChild(mainContainer); 
            });
          }
        } else {
          this.ErrorContent(mainContainer, "Erro:" + this.searchData.statusText);
        }
      } catch (error) {
        this.ErrorContent(mainContainer, "Erro" + error);
      }
    }
  }

  async GetById(id) {
    let get = await fetch(`${API_URL}/infracoes?id=${id}`, { method: "GET", headers: { "Token-Acces": this.sessionId } })
    if (get.ok) {
      let data = await get.json();
      return new Promise((resolve, reject) => {
        resolve(data);
      })
    } else {
      console.error(get.statusText);
    }
  }

  // Atualizar status
  async AtualizarStatus(mainContainer, status, id){
    this.modal.classList.add("modalFocus");
    this.modal.innerHTML = Spinner1();
    mainContainer.appendChild(this.modal);
    try {
      this.update = await fetch(`${API_URL}/infracoes`,{
        headers:{
          "Token-Acces":this.sessionId
        },
        method:"PUT",
        body:JSON.stringify({ status:status, id:id })
      });
      if (this.update.ok) {
        this.data = await this.update.json();
        let { sucess, error } = this.data.statusUpdate;
        if (sucess) {
          this.RemoveChild(mainContainer);
          this.SucessComponent(mainContainer, sucess);
        } else{
          this.RemoveChild(mainContainer);
          this.SetError(mainContainer, error);
        }
      }
    } catch (error) {
      this.RemoveChild(mainContainer);
      this.SetError(mainContainer,error);
    }
  }
  async Editar(mainContainer, id) {
    mainContainer.appendChild(this.modal);
    this.modal.classList.add('modalFocus');
    this.modal.innerHTML = Spinner1();

    this.data = await this.GetById(id);
    this.modal.innerHTML = FormInfracoes(this.data);
    this.closeForm = this.modal.querySelector("#closeButton");
    this.closeForm.addEventListener("click", () => { this.ReloadContainer() })
    this.form = this.modal.querySelector("#formCadastroInfracoes");

    try {
      this.form.addEventListener("submit", async (e) => {
        e.preventDefault();
        this.inputs = e.target.querySelectorAll(".input");
        if (ValidateInputs(this.inputs)) {
          this.FormLoading(this.form);
          this.formData = {
            id: id,
            infracao_tipo: this.inputs[0].value,
            data_infracao: this.inputs[1].value,
            localizacao: this.inputs[2].value,
            valor_multa: this.inputs[3].value,
            descricao: this.inputs[4].value,
          }
          this.sendData = await fetch(`${API_URL}/infracoes`,
            {
              method: "PUT",
              headers: { "Token-Acces": this.sessionId },
              body: JSON.stringify(this.formData)
            }
          )
          if (this.sendData.ok) {
            this.data = await this.sendData.json();
            let { sucess, error } = this.data.update;
            if (error) {
              this.Error(this.form, error)
            } else {
              this.Message(this.form, sucess);
            }
          } else {
            this.SetError(mainContainer, this.searchData.statusText);
          }
        } else {
          this.Error(this.form, "Preencha todos os Campos!");
        }
      })
    } catch (error) {
      this.modal.innerHTML = PpoUp("Erro: ", error);
      this.CloseModal(mainContainer);
    }
  }
  ///cadastrar
  async Cadastrar(form, formData) {
    this.Loader(form, this.loader);
    try {
      let fetchData = await fetch(`${API_URL}/infracoes`, {
        method: "POST",
        headers: {
          "Token-Acces": this.sessionId
        },
        body: formData
      });

      if (fetchData.ok) {
        let data = await fetchData.json();
        let { error, sucess } = data.result;
        if (sucess) {
          this.Message(form, sucess);
        } else {
          this.Error(form, error);
        }
      } else {
        this.Error(form, "Falha ao comunicar com o servidor.");
      }
    } catch (error) {
      this.Error(form, error);
    }
  }
  //// estatisticas
  async Estatisticas(mainContainer) {
    try {
      let fetchData = await fetch(`${API_URL}/estatisticas`, {
        method: "GET",
        headers: {
          "Token-Acces": this.sessionId
        }
      });
      if (fetchData.ok) {
        let data = await fetchData.json();
        mainContainer.querySelector("#cardElements").innerHTML = TopCardInfra(data);
      } else {
        this.SetError(mainContainer, "Erro ao carregar estatísticas.");
      }
    } catch (error) {
      this.SetError(mainContainer, error.message);
    }
  }

  FormLoading(form) {
    form.querySelector("#textError").innerHTML = Spinner4();
  }
  ErrorContent(mainContainer, message) {
    this.modal = mainContainer.querySelector(".modalFocus");
    this.modal.innerHTML = PpoUp(message, "error");

    this.CloseModal(mainContainer);
  }

  SetError(mainContainer, message) {
    this.modal = document.createElement("section");
    this.modal.classList.add("modalFocus");
    this.modal.innerHTML = PpoUp(message, "error");
    mainContainer.appendChild(this.modal);

    this.CloseModal(mainContainer);
  }

  CloseModal(mainContainer) {
    const button = mainContainer.querySelector("#closePopUp");
    button.addEventListener("click", () => { this.RemoveChild(mainContainer); });
  }

  ReloadContainer(){
    Infracoes();
  }

  RemoveChild(mainContainer) {
    this.modal = mainContainer.querySelector(".modalFocus");
    this.modal.innerHTML = "";
    mainContainer.removeChild(this.modal);
  
  }

  SucessComponent(mainContainer, message){
    this.modal.classList.add("modalFocus");
    this.modal.innerHTML = PpoUp(message, "sucess");
    mainContainer.appendChild(this.modal);

    this.CloseModal(mainContainer);
  }

  ReloadMessage(mainContainer, message, status){
    this.modal.classList.add("modalFocus");
    this.modal.innerHTML = PpoUp(message, status);
    mainContainer.appendChild(this.modal);

    mainContainer.querySelector("#closePopUp").addEventListener("click", 
      ()=>{ Infracoes() }
    );
  }

  Loader(form, loadMessage) {
    this.load = form.querySelector("#textError");
    this.load.innerHTML = loadMessage;
  }

  Message(form, message) {
    this.card = form.querySelector("#textError");
    this.card.innerHTML = message;
    this.card.classList.add("sucess");
  }

  Error(form, message) {
    this.contant = form.querySelector("#textError");
    this.contant.innerHTML = "Erro: " + message;
    this.contant.classList.add("error");
  }
}

export default new Infra();
