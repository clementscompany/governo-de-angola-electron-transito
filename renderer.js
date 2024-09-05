import Router, { Navigate } from "./router.js";
export const mainContainer = document.querySelector("#mainContainer");
window.addEventListener("DOMContentLoaded", ()=>{    
    const session_token = sessionStorage.getItem("session_token");
    if (!session_token) {
        Navigate("/login");
    } else{
       Router();
    }
    Router();
})
window.addEventListener("hashchange", Router);


