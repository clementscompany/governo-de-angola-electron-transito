function ComponentLogin(params) {
    var userNameCard = "";
    params ?
    params.forEach(username => {
        userNameCard += `<option value="${ username.username }">${ username.username }</option>`;
    })
     : "";
    return(`
        <section class="loginContainer">
          <form action="#" id="loginFormData">
           
            <div class="textError">
              <span>Isira os dados de acesso</span>
            </div>
            <div class="inputBox">
              <label for="username">Nome de usuário</label>
              <select name="username" id="username">
              <option value="">Selecione o seu usuario</option>
                ${ userNameCard }
              </select>
            </div>
            <div class="inputBox passwordBox">
              <label for="username">Nome de usuário</label>
              <input type="password" name="password" placeholder="Digite a sua senha" id="passwordInput">
            </div>
            <a href="#/recuver">Esqueceu a sua senha?</a>
            <div class="inputBox">
              <button id="logButton">Entrar</button>
            </div>
          </form>
          <div class="logo">
            <img src="./src/assets/img/policia2.png" alt="image">
            <h1>SISTEMA DE GESTÃO DE TRÂNSITO</h1>
            <h2>Faça o Login para acessar o Painel</h2>
          </div>
        </section>
        `);
}
export default ComponentLogin;