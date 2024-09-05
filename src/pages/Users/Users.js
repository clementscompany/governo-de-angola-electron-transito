import { mainContainer } from "../../../renderer.js";
import Users from "../../class/user.class.js";

export default function UsersPage(){
  new Users(mainContainer);
}
