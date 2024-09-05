export default function Menu() {
    return(
        `
            <div class="headerMenu">
              <img src="./src/assets/img/policia2.png" alt="Logo">
              <h2>SGT</h2>
            </div>
            <ul class="listMenu" id="listMenu">
                <li>
                    <a href="#/home"><i class="bi bi-house"></i>Dashboard</a>
                </li>
                <li>
                    <a href="#/viaturas"><i class="bi bi-car-front-fill"></i>Viaturas</a>
                </li>
                <li>
                    <a href="#/condutores"><i class="bi bi-sign-stop"></i>Condutores</a>
                </li>
                <li>
                    <a href="#/infracoes"><i class="bi bi-cone-striped"></i>Infrações</a>
                </li>
                <li>
                    <a href="#/users"><i class="bi bi-people"></i>Usuários</a>
                </li>
            </ul>  
        
        `
    );
}
