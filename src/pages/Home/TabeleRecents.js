export default function TabeleRecents(data) {
  var tableData = "";
  if (data) {
    if (data.success) {
      data.success.forEach(tb => {
        tableData += `
          <tr>
            <td>${tb.marca}</td>
            <td>${tb.modelo}</td>
            <td>${tb.tipo}</td>
            <td>${tb.matricula}</td>
          </tr> 
          `;
      });
    } else {
      tableData = `
        <tr>
          <td colspan="5">${data.error}</td>
        </tr> 
        `
    }
  }
  return (`
        <h2>Registros recentes</h2>
              <br>
              <table>
                <thead>
                    <tr>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Tipo</th>
                    <th>Matricula</th>
                    </tr>
                </thead>
                <tbody>
                  ${tableData}
                </tbody>
        </table>
        
        `);
}