export default function PasswordInput(id){
  return(`
    <form class="formCadastroViaturas " id="formCadastroUsers">
      <div class="textError sucess" id="textError">Admin</div>
      
      <div class="formGroup">
          <label for="password"> Digite a sua senha:</label>
          <input type="password" id="password" name="password" placeholder="Digite a sua senha" class="input">
      </div>

      <div class="formButton">
          <button type="submit">Enviar</button>
          <button type="reset" id="closeButton">Fechar</button>
      </div>
      <input type="hidden" name="id" value="${id}" class="input">
    </form>
    
    `);
}



export function ResultSearch(data){
  let {sucess, error} = data.search;
  return (`
    ${sucess ? 
      
      sucess.map((admin)=>(
`        <details>
          <summary>
            <i class="bi bi-person"></i>
            <h3>${ admin.nome }</h3>
          </summary>
          <ul>
            <li>Permissão: ${ admin.permission }</li>
            <li>Acesso ao sistema: ${admin.acess > 0 ? "Permitido" : "Não permitido"}</li>
            <li>Status: ${admin.status >  0 ? ` Online <i class="bi bi-circle-fill"></i>` : "Offline"}</li>
            <li class="optionButtons">
              <button value="${ admin.id }" class="deleteButton"><i class="bi bi-trash"></i></button>
              ${
                admin.acess > 0 ? `
                <button class="blockButton" value="${ admin.id }"><i class="bi bi-person-fill-slash"></i></button>
                ` :
                `
                <button class="unclockBtn" value="${ admin.id }"><i class="bi bi-slash-circle"></i></button>
                `
              }
              <button class="editButton" value="${ admin.id }"><i class="bi bi-pencil-square"></i></button>
            </li>
          </ul>
        </details>`

      )).join('')
      : 
`      <details>
        <summary>
          <h3>${ error }</h3>
        </summary>
      </details>`
    }
        
    `);
}