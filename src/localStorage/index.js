
let convertirJsonAString = (data) => JSON.stringify(data)

let convertirStringAJson = (data) => JSON.parse(data)

let guardarDataEnStorage = (item,data) => localStorage.setItem(item, convertirJsonAString(data));

let obtenerDataDelStorage = (item) => convertirStringAJson(localStorage.getItem(item));

let modificarDataDelStorage = (familiar,item) => {
    let data = obtenerDataDelStorage(item) 
    let index = data.findIndex(familiarStorage => familiarStorage.id === familiar.id)
    data[index] = familiar
    guardarDataEnStorage(item,data)
}

export {
    guardarDataEnStorage,
    obtenerDataDelStorage,
    modificarDataDelStorage
}