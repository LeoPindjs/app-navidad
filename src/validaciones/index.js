import { obtenerDataDelStorage } from "../localStorage"

let validarFamiliarPorId = (idFamiliar) => obtenerDataDelStorage('familiares').find(({id}) => id === idFamiliar)

let validarFamiliarPorContrasena = (contrasena) => obtenerDataDelStorage('familiares').find(({id}) => id === contrasena)    

let seleccionarTarjetaEnDondeSeAplicaUnClick = (tarjeta) => {
    let dataTarjetaIdFamiliar  = Number(tarjeta.dataset.idFamiliar)
    return validarFamiliarPorId(dataTarjetaIdFamiliar) // usuario por el que se votó
 }

export{
    validarFamiliarPorId,
    validarFamiliarPorContrasena,
    seleccionarTarjetaEnDondeSeAplicaUnClick,
}