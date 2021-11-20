import View from './Components/View.js'
import Model from './Components/Model.js'

const form = document.getElementById('formAddProducts')
const tableProducts = document.getElementById('table-products')
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
    let name, price, quantity

    name = e.target.name.value

    price = e.target.price.value
    price = parseFloat(price).toFixed(2)

    quantity = e.target.quantity.value

    const data = {
        name,
        price,
        quantity,
    }

    model.add(cloneJSON(data))
    e.target.reset()
})

tableProducts.addEventListener('click', (e) => {
    let action = e.target.dataset.action

    if (action === 'delete') {
        const key = e.target.dataset.key
        model.delete(key)
    } else if (action == 'edit') {
        const key = e.target.dataset.key
        model.update(key)
    }
})
