export function Spinner1() {
return (` 
        <div class="spinnerContainer">
            <div class="spinner1"><div class="spinner2"></div></div>
        </div>
    `);
}
export function Spinner4() {
    return (` 
            <div class="spinnerContainer">
                <div class="spinner4"><div class="spinner5"></div></div>
            </div>
        `);
    }
export function Modal(component){
    return  `<div class="modal">${component}</div>`;
}
export function PpoUp(message, status) {
    return(
        `
        <div class="popUp cdd">
          <div class="message">
            <span class="${status}">${message}</span>
          </div>
          <button id="closePopUp">ok</button>
        </div>
        `
    );
}

export function ContentModal(container){
  
  let data = new Date();
  let dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();
  return(`
    <div class="contentModal">
        <div class="topModal">
          <small>SGT- ${dia}/${mes}/${ano}</small>
          <button id="closeModal"><i class="bi bi-x"></i></button>
        </div>
        <div class="dataContent" id="dataContent">
          ${container}
        </div>
    </div>
    `);

    
}

export function AutoClick(message){
  return(
    `
      ${ message }<br>
      <small>Este serviço nem sempre tem estado disponível para atender as demandas necessitadas, principalmente em horários não comerciais, feriados, sábados e domingos, e se se por ventura o número do bilhete estiver correcto e os resultados não aparecer ou se não houver boa comuicação com o servidor, recomenda-se o cadastro de forma manual mas certifique-se de que o Número do documento foi inserido corretamente!</small><br>
      <button class="autoClick" id="autoClick">Cadastrar manualmente</button>
    `
  );
}

export function Choice(message) {
    return(
        `
        <div class="choice cdd">
          <div class="message">
            <span>${message}</span>
          </div>
          <div class="popUpButtons" id="popUpButtons">
            <button class="choiceBtn">Sim</button>
            <button class="choiceBtn">Não</button>
          </div>
        </div>
        `
    );
}

export function FormPassword(params) {
    return(`
        <div class="setPassword cdd">
            <div class="textError">
                <span>Defina a sua senha</span>
            </div>
            <div class="inputBox">
                <label for="username">Digite a sua senha</label>
                <input type="password" placeholder="Digite a sua senha" id="passwordInput">
            </div>
            <div class="inputBox passwordBox">
                <label for="username">Confirme a sua senha</label>
                <input type="password" placeholder="Confirme a sua senha" id="passwordInput">
            </div>
            <button id="eyeButton" class="eyeButton"><i class="bi bi-eye-slash-fill"></i></button>
            <div class="inputBoxButtom">
                <button id="logButton">Enviar</button>
                <button id="cancelButton">Cancelar</button>
            </div>
        </div>
    `);
}
