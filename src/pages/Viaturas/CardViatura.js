export default function CardViatura(viatura) {
    console.log(viatura[0]);
    return `
        <div class="cardViatura">
            <ul>
                <li><small><b>id</b>${ viatura[0].id }</small></li>
                <li><small><b>Marca</b>${ viatura[0].marca }</small></li>
                <li><small><b>Modelo</b>${ viatura[0].modelo }</small></li>
                <li><small><b>Tipo</b>${ viatura[0].tipo }</small</li>
                <li><small><b>Matrícula</b>${ viatura[0].matricula }</small></li>
                <li>
                    <button class="closeButton" id="closeButton">Fechar</button>
                </li>
            </ul>
        </div>
    `;
}
