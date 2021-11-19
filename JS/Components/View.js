export default class view {
    constructor(model) {
        this.table = document.getElementById('table-products')
        this.model = model
        this.products = []
        this.endIndex
    }
    render() {
        this.products.forEach((product) => {
            this.insertRow(product)
        })
    }

    setProducts(products) {
        this.products = products
    }

    insertRow({ name, price, quantity }) {
        const row = this.createRow(name, price, quantity)
        this.table.appendChild(row)
    }

    setEndIndex(index) {
        this.endIndex = index
    }

    createRow(productName, productPrice, productQuantity) {
        let row = document.createElement('tr')

        row.classList.add('table__row-product')
        row.setAttribute('id', this.endIndex)
        this.endIndex++

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
            console.log('remove', row.id)
        }

        row.append(name, price, quantity, controls)
        return row
        // Scheme of row in table

        // <tr class="table__row-product">
        //     <td class="row-text">name</td>
        //     <td class="row-text">price</td>
        //     <td class="row-text">quantity</td>
        //     <td class="controls">
        //         <button class="material-icons-outlined material-icons button">edit</button>
        //         <button class="material-icons-outlined material-icons icon-delete button">delete</button>
        //     </td>
        // </tr>
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
