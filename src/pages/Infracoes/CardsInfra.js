export default function TopCardInfra(data){
  let { estatisticas } = data;

  return(`
    <div class="dashboardCard">
      <h3>Total de Infrações</h3>
      <p>${ estatisticas?.totalInfracoes || "Carregando..."}</p>
    </div>

    <div class="dashboardCard">
      <h3>Valor Total das Multas</h3>
      <p>${ estatisticas?.totalMultas || "Carregando..." }kz</p>
    </div>

    <div class="dashboardCard">
      <h3>Status Atual de Pagamento</h3>
      <p>${ estatisticas?.pendentes  || "Carregando..." } pendentes, ${ estatisticas?.pagas || "Carregando..." } pagas</p>
    </div>

    <div class="dashboardCard">
      <h3>Infrações em média</h3>
      <p>${ estatisticas?.mediaMultas || "Carregando..." }</p>
    </div>

    <div class="dashboardCard">
      <h3>Infração Mais Grave</h3>
      <p>${ estatisticas?.maiores || "Carregando..." } a cima dos 50 000,00kz</p>
    </div>

    <div class="dashboardCard">
      <h3>Registros de Hoje</h3>
      <p>Um total de: ${ estatisticas?.regisrosAtuais || "Carregando..." } infrações</p>
    </div>
    `);
}

export function ListaUsuarios() {
  return (`
    <div class="listaUsuarios">
      <h3>Bilhete do condutor:</h3>
      
      <span class="textError reset"></span>
        <div class="inputBox">
          <label for="bilhete">Bilhete</label>
          <input type="text" placeholder="Digite o bilhete de identidade..." id="inputBi">
        </div>
      <div class="formButton">
        <button type="button" id="preencherForm">Próximo</button>
      </div>
      </div>
      
  `);

}

export function ResultSearch(data, details){
  return(`
    <div class="results">
      <small>Resultados para: <i>${ details }</i></small>
      <ul>
        ${data?.map(res=>(
          `<li class="getResult" id="${ res.id }">
            <small><b>Moises Clemente</b></small>
            <small>${ res.infracao_tipo }</small>
            <small>${ res.descricao }</small>
          </li>`
        )).join('')}
      </ul>
    </div>
    `);
}

export function ViewInfra(data){
  return(`
    <div class="results">
            <ul>
                <li><small><b>Nome </b>${data[0]?.nome || "Carregando..."}</small></li>
                <li><small><b>Descrição </b>${ data[0]?.descricao }</small></li>
                <li><small><b>Tipo de infração</b> ${ data[0]?.infracao_tipo }</small></li>
                <li><small><b>Localização </b>${ data[0]?.localizacao }</small</li>
                <li><small><b>Status atual: </b>${ data[0]?.status_pagamento }</small></li>
            </ul>
            <div class="cardActions resultAction">
                <button class="actionBtn editInfraBtn" value="${ data[0]?.id }">
                  <i class="bi bi-pen"></i>
                </button>
                <button class="actionBtn deleteButton" value="${ data[0]?.id }">
                  <i class="bi bi-trash"></i>
                </button>
                <select class="selectStatus" id="${ data[0]?.id }">
                  <option value="Pendente" ${ data[0]?.status_pagamento === 'Pendente' ? 'selected' : ''}>
                    Pendente
                  </option>
                  <option value="pago" ${ data[0]?.status_pagamento === "pago" ? "selected" : "" }>Pago</option>
                  <option value="Processando" ${ data[0]?.status_pagamento === "Processando" ? "selected" : "" }>
                    Em Processamento
                  </option>
                </select>
            </div>
    </div>
    `);
}