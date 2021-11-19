export default class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }

    addProduct(product) {
        this.model.add(product)
        this.view.insertRow(product)
    }
    udpateProduct(product) {
        if (this.model.update(product)) {
            this.view.updateRow(product)

            this.view.render()
        }
    }
}
