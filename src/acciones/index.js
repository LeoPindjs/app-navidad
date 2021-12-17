import confetti from "canvas-confetti"
import { generarDialogos } from "../dialogos/index.js"
import { validarFamiliarPorId } from "../validaciones/index.js"

let generConfetty = () => {
    confetti.create(document.getElementById('canvas'), {
        resize: true,
        useWorker: true,
     })({ particleCount: 2500, spread: 500 })
}

let accionesSobreLaTarjeta = (tarjeta) => {
    let dataTarjetaIdFamiliar = Number(tarjeta.dataset.idFamiliar)
    let familiar = validarFamiliarPorId(dataTarjetaIdFamiliar)
    generConfetty()
    generarDialogos({
        title: 'Familiar',
        text: `Te salió ${familiar.nombre}`,
        imageUrl: `${familiar.imagenGato}`,
        imageWidth: 200,
        imageHeight: 300,
        padding: '1em',
        backdrop: 'rgba(0,0,0,0.6)',
        confirmButtonColor:'#dc3545',
        confirmButtonText: 'Entendido',
      })
      setTimeout(() => {
          window.location.reload()
      },5000)    
}

export {
    accionesSobreLaTarjeta
}