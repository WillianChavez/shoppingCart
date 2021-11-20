export default class view {
    constructor() {
        this.table = document.getElementById('table-products')
        this.model
        this.products = []
        this.endIndex
    }

    setModel(model) {
        this.model = model
    }
    render() {
        this.products.forEach((product) => {
            this.insertRow(product)
        })
    }

    setProducts(products) {
        this.products = products
    }

    insertRow({ name, price, quantity, id }) {
        const row = this.createRow(name, price, quantity, id)
        this.table.appendChild(row)
    }

    setEndIndex(index) {
        if (index == undefined) {
            this.endIndex = 0
        } else {
            this.endIndex = index
        }
    }
    nextIndex() {
        let index = parseInt(this.endIndex) + 1
        this.endIndex = index
    }

    createRow(productName, productPrice, productQuantity, id) {
        let row = document.createElement('tr')

        row.classList.add('table__row-product')
        row.setAttribute('id', id)

        let name = document.createElement('td')
        let price = document.createElement('td')
        let quantity = document.createElement('td')

        name.classList.add('row-text')
        price.classList.add('row-text')
        quantity.classList.add('row-text')

        name.textContent = productName
        price.textContent = `$${productPrice}`
        quantity.textContent = productQuantity

        let controls = document.createElement('td')
        let editButton = document.createElement('button')
        let removeButton = document.createElement('button')

        editButton.classList.add('material-icons-outlined', 'material-icons', 'button')
        editButton.textContent = 'edit'
        removeButton.classList.add('material-icons-outlined', 'material-icons', 'icon-delete', 'button')
        removeButton.textContent = 'delete'

        controls.append(editButton, removeButton)
        editButton.onclick = () => {
            console.log('edit', row.id)
        }
        removeButton.onclick = () => {
            this.model.delete(parseInt(row.id))
        }

        row.append(name, price, quantity, controls)
        return row
    }

    removeRow(id) {
        let row = document.getElementById(id)
        this.table.removeChild(row)
    }

    updateRow({ name, price, quantity, id }) {
        let row = document.getElementById(id)
        row.children[0].textContent = name
        row.children[1].textContent = `$${price}`
        row.children[2].textContent = quantity
    }
}
