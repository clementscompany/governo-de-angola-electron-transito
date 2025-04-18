export default function FormUsers(data, title){
  return(
      `<form class="formCadastroViaturas " id="formCadastroUsers">
       ${title ? `<h2>${title}</h2>` : `<h2>Cadastro de usuário</h2>`}
      <br>
      <div class="formGroup">
          <label for="name">Nome completo:</label>
          <input type="text" id="name" name="name" placeholder="Digite o nome completo" class="input"
          value="${ data?.nome || "" }"}>
      </div>
      <div class="formGroup">
        <label for="username">Nome de utilizador</label>
        <input type="username" placeholder="Mome de utilizador" id="username" name="username" class="input"
        value="${ data?.username || ""}">
      </div>
      <div class="formGroup">
        <label for="permission">Permissão:</label>
        <select name="permission" id="permission" class="input">
          <option value="">Selecione</option>
          <option value="root" ${data?.permission === "root" ? "selected" : ""}>Admin</option>
          <option value="client" ${data?.permission === "client" ? "selected" : ""}>Normal</option>
        </select>
      </div>

      <div class="formButton">
          <button type="submit">Registrar</button>
          <button type="reset" id="closeButton">Fechar</button>
      </div>
      <div class="textError" id="textError"></div>
      <input type="hidden" name="id" value="${data?.id}" class="input">
    </form>
    `
  );
}