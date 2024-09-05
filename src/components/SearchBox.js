export default function SearchBox() {
    return `
      <div class="comboBox">
        <form class="searchBox" id="searchBox">
            <input type="search" id="inputSearch" placeholder="Pesquisar..." class="input">
            <button type="submit"><i class="bi bi-search"></i></button>
        </form>
        <small id="resultSearch"></small>
      </div>
    `;
}