import View from './Components/View.js'
import Model from './Components/Model.js'

const form = document.getElementById('formAddProducts')
let view, model

const cloneJSON = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}
addEventListener('load', () => {
    const dbName = 'ShoppingCart'
    const dbVersion = 1
    view = new View()
    model = new Model(dbName, dbVersion, view)
    view.setModel(model)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = {
        name: e.target.name.value,
        price: e.target.price.value,
        quantity: e.target.amount.value,
        id: view.endIndex,
    }

    model.add(cloneJSON(data))

    e.target.reset()
})
