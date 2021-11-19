import View from './Components/View.js'
import Controller from './Components/Controller.js'
import Model from './Components/Model.js'

const form = document.getElementById('formAddProducts')
let view, controller, model

addEventListener('load', () => {
    const dbName = 'ShoppingCart'
    const dbVersion = 1
    view = new View()
    model = new Model(dbName, dbVersion, view)
    controller = new Controller(model, view)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e)
    const data = {
        name: e.target.name.value,
        price: e.target.price.value,
        quantity: e.target.amount.value,
    }

    controller.addProduct({ ...data })

    e.target.reset()
})
