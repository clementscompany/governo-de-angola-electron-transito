export default function FormCondutores(data){
    return(`
     <form class="formCadastroViaturas" id="formCadastroViaturas">
        <small>digite o número do bilhete para obter os dados do condutor</small>
        <div class="formGroup">
            <label for="bilhete">Número do Bilhete:</label>
            <input type="text" id="bilhete" name="bilhete" placeholder="Digite o número do bilhete" maxlength="15">
        </div>
         <div class="formGroup">
            <label for="telefone">Número de telefone:</label>
            <input type="tel" id="telefone" name="bilhete" placeholder="Digite o número de telefone">
        </div>
        <div class="formButton">
            <button type="submit">Consultar</button>
            <button type="reset" id="closeButton">Fechar</button>
        </div>
      </form>
      <div class="textError" id="textError"></div>
  `);
}