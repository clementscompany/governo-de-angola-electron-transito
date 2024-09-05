export default function TableInfracoes(data) {
  var { 
    sucess, 
    error,
    total
  } = data.infracoes;

  return (
    `
    <div class="topicTable">
        <h2>Infrações Cadastradas ${ total }</h2>
        <div class="tableButtons">
          <button id="reloadButton"><i class="bi bi-arrow-repeat"></i></button>
          <button id="addButton">+</button>
        </div>
    </div>
    <br>
    <br>
    ${sucess ?
      sucess.map(inf=> (
        `
        <div class="cardInfra">
          <ul>
            <li class="title">Infração de Trânsito</li>
            <li class="cf"><b>Condutor: </b> ${ inf.nome }</li>
            <li class="cf"><b>Tipo de infração:</b> ${ inf.infracao_tipo }</li>
            <li class="cf">
              <b>Descrição:</b>
              <div class="messageCard">
                ${ inf.descricao }
              </div>
            </li>
            <li class="cf"><b>Valor da Multa: ${inf.valor_multa}</b></li>
            <li class="cf">
              <b>Status do Pagamento: ${ inf.status_pagamento }</b>
            </li>
            <li class="cf"><small>Criado em: ${new Date(inf.criado_em).toLocaleDateString("pt-PT")}</small></li>
            <div class="cardActions">
              <button class="actionBtn editInfraBtn" value="${ inf.id }"><i class="bi bi-pen"></i></button>
              <button class="actionBtn deleteInfraButton" value="${ inf.id }"><i class="bi bi-trash"></i></button>
              <button class="actionBtn viewEditButton" value="${ inf.id }"><i class="bi bi-eye"></i></button>
            </div>
          </ul>
        </div>
        `
      )).join('') :

      `<span>${ error }</span>`
    }
    
    `);
}





