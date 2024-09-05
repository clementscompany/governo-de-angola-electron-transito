export default function TableCondutores(data) {
  let TabeleContainer = "";
  if (data.sucess) {
    data.sucess.forEach(usr=> {
      if (usr.nome.length > 12) {
        usr.nome = usr.nome.substring(0, 12)+"...";
      }
      TabeleContainer += `
      <tr>
        <td>${ usr.nome }</td>
        <td>${ usr.bilhete }</td>
        <td>${ usr.genero }</td>
        <td>${ usr.telefone }</td>
        <td>
          <div class="optionsButton">
            <button value="${ usr.id }" id="viewButton"><i class="bi bi-eye"></i></button>
            <button value="${ usr.id }" id="deleteButton"><i class="bi bi-trash"></i></button>
          </div>
        </td>
      </tr>
      `;
    });
  } else{
    TabeleContainer = `
      <tr>
          <td colspan="5">${ data.error }</td>
      </tr>
    `;
  }
  return (
    `
      <div class="topicTable">
          <h2>Condutores Cadastrados</h2>
          <div class="tableButtons">
            <button id="reloadButton"><i class="bi bi-arrow-repeat"></i></button>
            <button id="addButton">+</button>
          </div>
      </div>
        <br>
      <table>
          <thead>
              <tr>
              <th>Nome</th>
              <th>Bilhete</th>
              <th>Género</th>
              <th>Telefone</th>
              <th>Opções</th>
              </tr>
          </thead>
          <tbody>
              ${TabeleContainer}
          </tbody>
      </table>
    `
  );
}