let componenteTarjetaFamiliar = (familiares) => (
    familiares.map(({id,imagenNavidad}) => (
    `<div class="col">
        <div class="card" data-id-familiar="${id}">
            <img class="card__image" src="${imagenNavidad}" alt="Navidad">
            <div class="card-body">
                <h5 class="card-title"><b>Quien te saldrá ?</b></h5>
                <p class="card-text">
                Seleciona una tarjeta.
                En ella encontrarás un familiar, al cual debes darle un regalo.
                Recuerda que el regalo no debe exceder el monto de <b>$60.000</b>.
                Saludos a todos y que comiencen el juego.
                </p>
            </div>
        </div>
    </div>`
)).join(' ') 
)

let renderDOM = (familiares) => {
    let row = document.querySelector('.galeria-familiar')
    row.innerHTML = componenteTarjetaFamiliar(familiares)
}

export{
    renderDOM
}