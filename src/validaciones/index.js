import { familiares } from "../dataFamiliares/index.js"

let validarFamiliarPorId = (idFamiliar) => familiares.find(({id}) => id === idFamiliar)

let validarFamiliarPorContrasena = (contrasena) => familiares.find(({id}) => id === contrasena)    

let seleccionarTarjetaEnDondeSeAplicaUnClick = (tarjeta) => {
    let dataTarjetaIdFamiliar  = Number(tarjeta.dataset.idFamiliar)
    return validarFamiliarPorId(dataTarjetaIdFamiliar) // usuario por el que se votó
 }

 //let mostrarFamiliaresQueNoEstanVotando  = (contrasena) => familiares.filter(({id}) => id !== contrasena)
 
export{
    validarFamiliarPorId,
    validarFamiliarPorContrasena,
    seleccionarTarjetaEnDondeSeAplicaUnClick,
}