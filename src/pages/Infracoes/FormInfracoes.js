export default function FormInfracoes(data) {
  
  if (data) {
    let { sucess } = data.result;
    
    return `
      <form class="formCadastroViaturas modalForm" id="formCadastroInfracoes">
         <div class="formGroup">
             <label for="infracao_tipo">Tipo de Infração:</label>
             <input type="text" id="infracao_tipo" name="infracao_tipo" placeholder="Digite o tipo de infração"
              value="${sucess[0]?.infracao_tipo}"
              class="input">
         </div>
         <div class="formGroup">
           <label for="data_infracao">Data da Infração:</label>
           <input type="date" id="data_infracao" name="data_infracao" class="input"
           value="${sucess[0]?.data_infracao}">
         </div>
         <div class="formGroup">
           <label for="localizacao">Localização:</label>
           <input type="text" id="localizacao" name="localizacao" placeholder="Digite a localização" class="input"
           value="${sucess[0]?.localizacao}">
         </div>
         <div class="formGroup">
           <label for="valor_multa">Valor da Multa:</label>
           <input type="number" id="valor_multa" name="valor_multa" placeholder="Digite o valor da multa"
           value="${sucess[0]?.valor_multa}"
           class="input">
         </div>
         <div class="formGroup">
             <label for="descricao">Descrição:</label>
             <textarea id="descricao" name="descricao" placeholder="Descreva a infração" class="input">${sucess[0]?.descricao}</textarea>
         </div>
         <div class="formButton">
             <button type="submit">Registrar</button>
             <button type="reset" id="closeButton">Fechar</button>
         </div>
         <div class="textError" id="textError"></div>
       </form>
   `;
  } else {
    return `
      <form class="formCadastroViaturas modalForm" id="formCadastroInfracoes">
         <div class="formGroup">
             <label for="infracao_tipo">Tipo de Infração:</label>
             <input type="text" id="infracao_tipo" name="infracao_tipo" placeholder="Digite o tipo de infração" class="input">
         </div>
         <div class="formGroup">
           <label for="data_infracao">Data da Infração:</label>
           <input type="date" id="data_infracao" name="data_infracao" class="input">
         </div>
         <div class="formGroup">
           <label for="localizacao">Localização:</label>
           <input type="text" id="localizacao" name="localizacao" placeholder="Digite a localização" class="input">
         </div>
         <div class="formGroup">
           <label for="valor_multa">Valor da Multa:</label>
           <input type="number" id="valor_multa" name="valor_multa" placeholder="Digite o valor da multa" class="input">
         </div>
         <div class="formGroup">
             <label for="descricao">Descrição:</label>
             <textarea id="descricao" name="descricao" placeholder="Descreva a infração" class="input"></textarea>
         </div>
         <div class="formButton">
             <button type="submit">Registrar</button>
             <button type="reset" id="closeButton">Fechar</button>
         </div>
         <div class="textError" id="textError"></div>
       </form>
   `;
  }
}
