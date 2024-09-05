export default function SeetingsPage(data) {  
  return(`
    <div class="cardProfilo">
      <i class="bi bi-person-circle"></i>
      <h2>${data?.nome || "Admin"}</h2>
      <div class="btn">
        <button id="sessionEnd">Terminar sessão <i class="bi bi-box-arrow-left"></i></button>
        <button id="closeContainer">cancelar</button>
        <button id="updatePassword">Altear senha</button>
      </div>
      <span>${ new Date().getFullYear() }</span>
    </div>
    `);
}