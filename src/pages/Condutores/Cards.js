
export function CardFormUsr(data){
  
  return(`
    <div class="cardViatura">
            <p>Resultados para: ${ data.numero }</p>
            <ul>
                <li><small><b>Nome</b>${ data.nome }</small></li>
                <li><small><b>Naturalidade</b>${ data.naturalidade }</small></li>
                <li><small><b>Genero</b>${ data.genero }</small></li>
                <li><small><b>Filhação Pai</b>${ data.pai_nome_completo }</small</li>
                <li><small><b>Filhação Mãe</b>${ data.mae_nome_completo }</small></li>
                <li><small><b>Estadi civil</b>${ data.estado_civil }</small></li>
                <li><small><b>Data de nascimento</b>${ data.data_nasc }</small></li>
                <li>
                    <button class="registerButton" id="registerButton">Cadastrar</button>
                </li>
            </ul>
      </div>

    `);
}

export function CardUser(data){
  return(`
    <div class="cardViatura">
            <p>Resultados para: ${ data[0].nome }</p>
            <ul>
                <li><small><b>Nome</b>${ data[0].nome }</small></li>
                <li><small><b>Naturalidade</b>${ data[0].naturalidade }</small></li>
                <li><small><b>Genero</b>${ data[0].genero }</small></li>
                <li><small><b>Filhação Pai</b>${ data[0].pai_nome_completo }</small</li>
                <li><small><b>Filhação Mãe</b>${ data[0].mae_nome_completo }</small></li>
                <li><small><b>Estadi civil</b>${ data[0].estado_civil }</small></li>
                <li><small><b>Data de nascimento</b>${ data[0].data_nasc }</small></li>
            </ul>
      </div>
    `);
}

export default function ManualForm(){

  return(

    `
    <form class="formCadastroViaturas" id="formAutoClick">
      <small>Preencha o formulario com os dados co condutor </small>
      
      <div class="formGroup">
          <label for="bilhete">Número do Bilhete:</label>
          <input type="text" id="bilhete" name="bilhete" placeholder="Digite o número do bilhete" maxlength="15">
      </div>
      
      <div class="formGroup">
          <label for="telefone">Número de telefone:</label>
          <input type="tel" id="telefone" name="telefone" placeholder="Digite o número de telefone">
      </div>
      
      <div class="formGroup">
          <label for="nome">Nome Completo:</label>
          <input type="text" id="nome" name="nome" placeholder="Digite o nome completo">
      </div>
      
      <div class="formGroup">
          <label for="naturalidade">Naturalidade:</label>
          <input type="text" id="naturalidade" name="naturalidade" placeholder="Digite a naturalidade">
      </div>
      
      <div class="formGroup">
          <label for="genero">Gênero:</label>
          <input type="text" id="genero" name="genero" placeholder="Digite o gênero">
      </div>
      
      <div class="formGroup">
          <label for="pai_nome_completo">Nome Completo do Pai:</label>
          <input type="text" id="pai_nome_completo" name="pai_nome_completo" placeholder="Digite o nome completo do pai">
      </div>
      
      <div class="formGroup">
          <label for="mae_nome_completo">Nome Completo da Mãe:</label>
          <input type="text" id="mae_nome_completo" name="mae_nome_completo" placeholder="Digite o nome completo da mãe">
      </div>
      
      <div class="formGroup">
          <label for="estado_civil">Estado Civil:</label>
          <input type="text" id="estado_civil" name="estado_civil" placeholder="Digite o estado civil">
      </div>
      
      <div class="formGroup">
          <label for="data_nasc">Data de Nascimento:</label>
          <input type="date" id="data_nasc" name="data_nasc">
      </div>
      
      <div class="formButton">
          <button type="submit">Cadastrar</button>
          <button type="reset" id="closeButton">Fechar</button>
      </div>
    </form>

    `
  );

}