import Condutores from "./src/pages/Condutores/Condutores.js";
import Home from "./src/pages/Home/Home.js";
import Infracoes from "./src/pages/Infracoes/Infracoes.js";
import LoginPage from "./src/pages/LoginPage.js";
import UsersPage from "./src/pages/Users/Users.js";
import Viaturas from "./src/pages/Viaturas/Viaturas.js";

export const Navigate = (path) =>{
    window.location.hash = path;
}
function Router(){
    let path = window.location.hash.substring(1);
    switch (path) {
        case "/home":
           Home();
        break;
        
        case "/login":
            LoginPage();
        break;

        case "/viaturas":
            Viaturas();
        break;

        case "/condutores":
          Condutores();
        break;

        case "/infracoes":
          Infracoes();
        break;

        case "/users":
          UsersPage();
        break;

        default:
            LoginPage();
        break;
    }
}
export default Router;