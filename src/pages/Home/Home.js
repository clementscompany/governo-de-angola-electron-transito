import { mainContainer } from "../../../renderer.js";
import CardElements from "../../components/CardElements.js";
import ComponentHome from "../../components/ComponentHome.js";
import { Modal, PpoUp, Spinner4 } from "../../components/elements.js";
import Menu from "../../components/Menu.js";
import { API_URL } from "../../env.js";
import Settings from "../settings/Settings.js";
import ThemeSystem from "../settings/ThemeSystem.js";
import TabeleRecents from "./TabeleRecents.js";
function Home() {
  
  const session_token = sessionStorage.getItem("session_token");
  async function Dashboard() {
    Loading();
    try {
      let getData = await fetch(`${API_URL}/dashboard`, {
        method: "GET", headers: { "Token-Acces": session_token }
      });
      if (getData.ok) {
        let data = await getData.json();
        mainContainer.innerHTML = ComponentHome("Dashboard");
        mainContainer.querySelector("#menu").innerHTML = Menu();
        Settings(mainContainer);
        mainContainer.querySelector("#cardElements").innerHTML = CardElements(data.dashboard);
        mainContainer.querySelector("#recents").innerHTML = TabeleRecents(data.dashboard);
        const navigator = mainContainer.querySelectorAll("#listMenu > li");
        navigator[0].classList.add("active");
        ThemeSystem.changeTheme(mainContainer);
      } else {
        mainContainer.innerHTML = Modal(PpoUp("Houve um erro inesperado: " + getData.statusText, "error"));
        mainContainer.querySelector("#closePopUp").onclick = () => { window.location.reload(true) }
      }
    } catch (error) {
      mainContainer.innerHTML = Modal(PpoUp("Houve um erro inesperado: " + error, "error"));
      mainContainer.querySelector("#closePopUp").onclick = () => { window.location.reload(true) }
    }
  }
  Dashboard();
  function Loading() {
    mainContainer.innerHTML = Modal(Spinner4());
  }
}
export default Home;
