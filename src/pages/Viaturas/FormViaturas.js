export default function FormCadastroViaturas(data) {

  if (!data) {
    return `
        <form class="formCadastroViaturas" id="formCadastroViaturas">
            <div class="formGroup">
                <label for="marca">Marca:</label>
                <input type="text" id="marca" name="marca" placeholder="Digite a marca">
            </div>
            <div class="formGroup">
                <label for="modelo">Modelo:</label>
                <input type="text" id="modelo" name="modelo" placeholder="Digite o modelo">
            </div>
            <div class="formGroup">
                <label for="tipo">Tipo:</label>
                <input type="text" id="tipo" name="tipo" placeholder="Digite o tipo: LIGEIRO, PESADO...">
            </div>
            <div class="formGroup">
                <label for="matricula">Matrícula:</label>
                <input type="text" id="matricula" name="matricula" placeholder="--- --- ---">
            </div>
            <div class="formButton">
                <button type="submit">Cadastrar</button>
                <button type="reset" id="closeButton">Fechar</button>
            </div>
        </form>
        <div class="textError" id="textError"></div>
    `;
  } else {
    return `
        <form class="formCadastroViaturas" id="formCadastroViaturas">
            <div class="formGroup">
                <label for="marca">Marca:</label>
                <input type="text" id="marca" name="marca" placeholder="Digite a marca" 
                value="${ data[0].marca }"
                >
            </div>
            <div class="formGroup">
                <label for="modelo">Modelo:</label>
                <input type="text" id="modelo" name="modelo" placeholder="Digite o modelo" 
                value="${ data[0].modelo }"
                >
            </div>
            <div class="formGroup">
                <label for="tipo">Tipo:</label>
                <input type="text" id="tipo" name="tipo" placeholder="Digite o tipo: LIGEIRO, PESADO..."
                value="${ data[0].tipo }"
                >
            </div>
            <div class="formGroup">
                <label for="matricula">Matrícula:</label>
                <input type="text" id="matricula" name="matricula" placeholder="--- --- ---"
                value="${ data[0].matricula }"
                >
            </div>
            <div class="formButton">
                <button type="submit">Atualizar</button>
                <button type="reset" id="closeButton">Fechar</button>
            </div>
        </form>
        <div class="textError" id="textError"></div>
      `;
  }

}
