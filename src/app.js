import { familiares } from './dataFamiliares/index.js'
import { accionesSobreLaTarjeta } from './acciones/index.js'
import { renderDOM } from './componentes/index.js'
import { dialogos, generarDialogos } from './dialogos/index.js'
import { 
    obtenerDataDelStorage,
    guardarDataEnStorage,
    modificarDataDelStorage
} from './localStorage/index.js'
/* import {numeroClicks,familiaresVotando} from './globales/index.js' */
import { mezclarFamiliares } from './helpers/index.js'
import { validarFamiliarPorId,validarFamiliarPorContrasena,seleccionarTarjetaEnDondeSeAplicaUnClick } from './validaciones/index.js'
let numeroClicks =  0
let familiaresVotando = 0
let obtenerValorEnInputContrasena = async () => {
    let configuraciones = {
        title: 'Contraseña',
        input: 'password',
        inputLabel: 'Ingresa tu contraseña',
        inputPlaceholder: 'Contraseña',
        confirmButtonText:'Enviar',
        //grow:'fullscreen',
        confirmButtonColor:'#dc3545',
        inputAttributes: {
            maxlength: 10,
            autocapitalize: 'off',
            autocorrect: 'off'
        },
    }
    const { value: contrasena } = await Swal.fire(configuraciones)
    if (!contrasena){
        Swal.fire({
            text:'La contraseña es inválida',
            icon:'error',
            confirmButtonText:'Entiendo',
            with:'90%',
            pading:'1rem',
            backdrop:true,
            timer:'5000',
            showConfirmButton:false,
        })
        setTimeout(() => {
        window.location.reload()
        } ,5000)
    }
    return contrasena
}

let main = async () => {
    if(obtenerDataDelStorage('familiares') === null){
        guardarDataEnStorage('familiares',familiares)
    }else{
        let familiarVotando = Number(obtenerDataDelStorage('familiaresVotando'))
        if( familiarVotando === 0){    
            let contrasena = Number(await obtenerValorEnInputContrasena())
            let familiarQueVota = validarFamiliarPorContrasena(contrasena)
            if(familiarQueVota && familiarQueVota.yaVoto === false){
                // mdificar data en el storage
                let familiarQueVotoModificado = {...familiarQueVota, yaVoto:true}
                modificarDataDelStorage(familiarQueVotoModificado,'familiares')
                
                let familiares = obtenerDataDelStorage('familiares')
                familiares = mezclarFamiliares(familiares)
                if(familiares){
                    let familiaresQueSepuedenSeleccionar = familiares.filter(familiar => familiar.escogido !== true && familiar.yaVoto !== true)
                    renderDOM(familiaresQueSepuedenSeleccionar)
                    let tarjetas = document.querySelectorAll('.card')
                    tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', function(){
                        if(numeroClicks === 0){
                            let familiarSeleccionado = seleccionarTarjetaEnDondeSeAplicaUnClick(tarjeta)
                            // mdificar data en el storage
                            familiarSeleccionado = {...familiarSeleccionado, escogido:true}
                            modificarDataDelStorage(familiarSeleccionado,'familiares')
                            let{id,nombre} = familiarSeleccionado
                            // mdificar data en el storage
                            familiarQueVotoModificado = {...familiarQueVota, porQuienVoto:{id,nombre}, yaVoto:true}
                            modificarDataDelStorage(familiarQueVotoModificado,'familiares')
                            accionesSobreLaTarjeta(tarjeta)
                            numeroClicks++
                        }
                    }))
                }else{
                    generarDialogos(dialogos.informativo )  
                    setTimeout(() => {
                        window.location.reload()
                    }, 5000)
                }
            }else{
                generarDialogos(dialogos.error)
                setTimeout(() => {
                    window.location.reload()
                }, 5000)
            }
        }else{
            generarDialogos({title: 'Se encuentran votando en éste momento. Intenta en unos minutos. Gracias'})
        }
    }
}

export { main }
