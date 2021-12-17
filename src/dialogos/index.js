let dialogos = {
    error:{
        text:'La contraseña es  inválida',
        icon:'error',
        with:'90%',
        pading:'1rem',
        timer:'5000',
        toast:true,
        position:'top-end',
        showConfirmButton:false,
    },
    informativo:{
        text:'No hay familiares que votar',
        icon:'info',
        with:'90%',
        pading:'1rem',
        timer:'5000',
        toast:true,
        position:'top-end',
        showConfirmButton:false,
    }
}

let generarDialogos = (configuraciones) => Swal.fire(configuraciones)

export {
    dialogos,
    generarDialogos
}