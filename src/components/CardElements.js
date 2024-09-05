export default function CardElements(data){
   return(`
         <div class="cards cdd">
                <span>veiculos cadastrados</span>
                <h1>${ data.totalViaturas }</h1>
              </div>
              <div class="cards cdd">
                <span>Condutores cadastrados</span>
                <h1>${ data.totalcond }</h1>
              </div>
              <div class="cards cdd">
                <span>Infrações cadastradas</span>
                <h1>2</h1>
             </div>
        </div>
    
    `);
}
