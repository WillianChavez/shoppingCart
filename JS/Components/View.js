export default class view {
    constructor() {
        this.table = document.getElementById('table-products')
        this.modal = document.getElementById('modal-product')
        this.model
    }

    setModel(model) {
        this.model = model
    }
    render(products) {
        const header = this.table.firstElementChild
        this.table.innerHTML = ''
        const fragment = document.createDocumentFragment()
        products.forEach((product) => {
            let row = this.createRow(product)
            fragment.append(row)
        })
        this.table.append(header, fragment)
    }

    createRow({ name, price, quantity }) {
        let row = document.createElement('tr')

        row.classList.add('table__row-product')

        let elementName = document.createElement('td')
        let elementPrice = document.createElement('td')
        let elementQuantity = document.createElement('td')

        elementName.classList.add('row-text')
        elementPrice.classList.add('row-text')
        elementQuantity.classList.add('row-text')

        elementName.textContent = name
        elementPrice.textContent = `$${price}`
        elementQuantity.textContent = quantity

        let controls = document.createElement('td')
        let editButton = document.createElement('button')
        let removeButton = document.createElement('button')

        editButton.classList.add('material-icons-outlined', 'material-icons', 'button')
        editButton.textContent = 'edit'
        removeButton.classList.add('material-icons-outlined', 'material-icons', 'icon-delete', 'button')
        removeButton.textContent = 'delete'

        editButton.dataset.key = name
        editButton.dataset.action = 'edit'

        removeButton.dataset.key = name
        removeButton.dataset.action = 'delete'

        controls.append(editButton, removeButton)

        row.append(elementName, elementPrice, elementQuantity, controls)
        return row
    }

    showModal() {}
}
