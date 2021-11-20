import View from './Components/View.js'
import Model from './Components/Model.js'

const form = document.getElementById('formAddProducts')

// Initialixe the objects
let view, model

// return the clone of some object
const cloneJSON = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

// listener  load window
addEventListener('load', () => {
    const dbName = 'ShoppingCart'
    const dbVersion = 1
    view = new View()
    model = new Model(dbName, dbVersion, view)
    view.setModel(model)
})

// listener submit form
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let name, price, quantity

    // cath the values
    name = e.target.name.value

    price = e.target.price.value
    price = parseFloat(price).toFixed(2)

    quantity = e.target.quantity.value

    // model product object
    const data = {
        name: name,
        price: price,
        quantity: quantity,
        id: view.endIndex,
    }

    // add product in database
    model.add(cloneJSON(data))

    // clean form
    e.target.reset()
})
