let convertirJsonAString = (data) => JSON.stringify(data)

let convertirStringAJson = (data) => JSON.parse(data)

let guardarDataEnStorage = (item,data) => localStorage.setItem(item, convertirJsonAString(data));

let obtenerDataDelStorage = (item) => convertirStringAJson(localStorage.getItem(item));

let modificarDataDelStorage = (familiar,item) => {
    let familiares = obtenerDataDelStorage(item)
    familiares.forEach((familiarStorage,index) => familiarStorage.id === familiar.id  && familiares.splice(index,1,familiar))
    guardarDataEnStorage(item,familiares)
}

export {
    guardarDataEnStorage,
    obtenerDataDelStorage,
    modificarDataDelStorage
}