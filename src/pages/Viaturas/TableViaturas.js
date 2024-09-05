export default function TableViaturas(data){
    let TabeleContainer = "";
    if (data.sucess) {
        data.sucess.forEach(dt => {
            TabeleContainer += 
        `<tr>
            <td >${ dt.marca }</td>
            <td >${ dt.modelo }</td>
            <td >${ dt.tipo }</td>
            <td >${ dt.matricula }</td>
            <td >
                <div class="optionsButton">
                    <button value="${ dt.id }" id="viewButton"><i class="bi bi-eye"></i></button>
                    <button value="${ dt.id }" id="deleteButton"><i class="bi bi-trash"></i></button>
                    <button value="${ dt.id }" id="editButtons"><i class="bi bi-pen"></i></button>
                </div>
            </td>
        </tr> `;
        });
    } else{
        TabeleContainer = 
        `<tr>
            <td colspan="5">${ data.error }</td>
        </tr> `;
    }
    return(`
        <div class="topicTable">
            <h2>Viaturas cadastradas</h2>
            <div class="tableButtons">
              <button id="reloadButton"><i class="bi bi-arrow-repeat"></i></button>
              <button id="addButton">+</button>
            </div>
        </div>
        <br>
        <table>
            <thead>
                <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Tipo</th>
                <th>Matricula</th>
                <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                ${ TabeleContainer }
            </tbody>
        </table>
        
        `);
}