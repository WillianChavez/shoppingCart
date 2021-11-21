export default class view {
    constructor() {
        this.table = document.getElementById('table-products')
        this.modal = document.getElementById('modal-products')
        this.model

        this.modal.addEventListener('click', (e) => {
            const action = e.target.dataset.action
            if (action == 'close') {
                this.closeModal()
            }
        })

        this.modal.addEventListener('submit', (e) => {
            event.preventDefault()

            let name, price, quantity

            name = e.target.modalName.value

            price = e.target.modalPrice.value
            price = parseFloat(price).toFixed(2)

            quantity = e.target.modalQuantity.value

            // model product object
            const data = {
                name,
                price,
                quantity,
            }

            this.model.update(this.cloneJSON(data))
            this.closeModal()
        })
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

    showModal(row) {
        const name = row.children[0].textContent
        // prince is $###.## with slice to remove $
        const price = row.children[1].textContent.slice(1)
        const quantity = row.children[2].textContent

        this.setDataModal(name, price, quantity)

        this.modal.classList.remove('hidden')
    }

    closeModal() {
        this.modal.classList.add('hidden')
    }

    setDataModal(name, price, quantity) {
        const modalName = this.modal.querySelector('input[name="modalName"]')
        const modalPrice = this.modal.querySelector('input[name="modalPrice"]')
        const modalQuantity = this.modal.querySelector('input[name="modalQuantity"]')

        modalName.value = name
        modalPrice.value = price
        modalQuantity.value = quantity
    }

    // return the clone of some object
    cloneJSON(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
}
