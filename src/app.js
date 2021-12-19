import { familiares } from './dataFamiliares/index.js'
import { accionesSobreLaTarjeta } from './acciones/index.js'
import { renderDOM } from './componentes/index.js'
import { dialogos, generarDialogos } from './dialogos/index.js'
import { 
    obtenerDataDelStorage,
    guardarDataEnStorage,
    modificarDataDelStorage
} from './localStorage/index.js'
import { mezclarFamiliares } from './helpers/index.js'
import { validarFamiliarPorContrasena,seleccionarTarjetaEnDondeSeAplicaUnClick } from './validaciones/index.js'

let numeroClicks =  0
let personasVotando = 0
localStorage.setItem('personasVotando',JSON.stringify(personasVotando))

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
    let { value: contrasena } = await Swal.fire(configuraciones)
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

let familiaresQueSepuedenSeleccionar =  (familiaresStorage) => {
    let familiaresSinRegalo = []
    
    for (const familiarSinRegalo of familiaresStorage) {
        if(familiarSinRegalo.escogido === false) familiaresSinRegalo.push(familiarSinRegalo)
    }

    return familiaresSinRegalo

} 

let agregarListenersATarjetas = (tarjetas,familiarQueVota) => {
    tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', function(){
        if(numeroClicks === 0){
            let familiarSeleccionado = seleccionarTarjetaEnDondeSeAplicaUnClick(tarjeta)
            
            // mdificar data en el storage
            familiarSeleccionado.escogido = true
            modificarDataDelStorage(familiarSeleccionado,'familiares')
            let{id,nombre} = familiarSeleccionado
            
            // mdificar data en el storage
            familiarQueVota.porQuienVoto = {id,nombre}
            familiarQueVota.yaVoto = true
            modificarDataDelStorage(familiarQueVota,'familiares')
            
            //console.table(obtenerDataDelStorage('familiares'))
            accionesSobreLaTarjeta(tarjeta)
            numeroClicks++
        }
    }))
}

let validarContrasena = (contrasena) => validarFamiliarPorContrasena(contrasena)

let accesoGaleriaDeImagenes = (ok,familiarQueVota) => {
    if(ok){
        // mdificar data en el storage
        familiarQueVota.yaVoto = true
        modificarDataDelStorage(familiarQueVota,'familiares')
        //let familiaresSinVotar = obtenerDataDelStorage('familiares').filter(({yaVoto}) => yaVoto !== true)
        let familiaresStorage = [...obtenerDataDelStorage('familiares')]
        let familiaresSeleccionados = familiaresQueSepuedenSeleccionar(familiaresStorage)
        if(familiaresSeleccionados.length > 0){
            let familiaresMezclados = mezclarFamiliares(familiaresSeleccionados)
            console.log(familiaresMezclados.length)
            renderDOM(familiaresMezclados)
            agregarListenersATarjetas([...document.querySelectorAll('.card')],familiarQueVota)
        }else{
            generarDialogos(dialogos.informativo)
        }
    }else{
        generarDialogos(dialogos.error)
        setTimeout(() => {
            window.location.reload()
        }, 5000)
    }    
}

let inicioDelJuego = async() => {    
    let contrasena = Number(await obtenerValorEnInputContrasena())
    let familiarQueVota = validarContrasena(contrasena)
    if(familiarQueVota){
        let { yaVoto }  = familiarQueVota
        let ok = yaVoto === false
        accesoGaleriaDeImagenes(ok,familiarQueVota)       
    }else{
        generarDialogos(dialogos.error)
        setTimeout(() => {
            window.location.reload()
        }, 5000)
    }
}

let main = () => {
    if(obtenerDataDelStorage('familiares') === null){
        guardarDataEnStorage('familiares',familiares)
        inicioDelJuego()
    }else{
        inicioDelJuego()
    }
}

export { main }
