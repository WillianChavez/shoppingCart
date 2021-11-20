export default class Model {
    constructor(dbName, dbVersion, view) {
        // properties
        this.dbName = dbName
        this.dbVersion = dbVersion
        this.products
        this.view = view
        this.db

        this.open(this.dbName, this.dbVersion)
    }

    // open conecction
    open(dbName, dbVersion) {
        this.dbName = dbName
        this.dbVersion = dbVersion

        const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

        let request = indexedDB.open(dbName, dbVersion)

        request.onerror = () => {
            console.log('Error opening database')
        }

        request.onsuccess = () => {
            console.log('Database opened successfully')
            this.db = request.result
            this.getAll()
        }

        request.onupgradeneeded = (event) => {
            this.db = event.target.result

            let store = this.db.createObjectStore('Carrito', { autoIncrement: true })
            store.createIndex('name', 'name', { unique: false })

            store.transaction.oncomplete = () => {
                this.db = event.target.result
                console.log('Database upgrade completed')
            }
        }
    }

    // add product in database
    add(product) {
        let transaction = this.db.transaction(['Carrito'], 'readwrite')
        let store = transaction.objectStore('Carrito')
        product.id = this.view.endIndex
        this.view.nextIndex()
        let request = store.add(product)

        request.onsuccess = () => {
            this.products.push(product)
            this.view.insertRow(product)
            console.log('Product added successfully')
        }

        request.onerror = () => {
            console.log('Error adding product')
        }
    }

    // get All products from database
    getAll() {
        let transaction = this.db.transaction(['Carrito'])
        let store = transaction.objectStore('Carrito')
        let request = store.getAll()

        request.onsuccess = (event) => {
            this.products = event.target.result
            this.getEndIndex()

            console.log('getAll success')
        }

        request.onerror = () => {
            console.log('Error retrieving products')
        }
    }

    // get end index of database
    getEndIndex() {
        const transaction = this.db.transaction(['Carrito'])
        const store = transaction.objectStore('Carrito')
        store.openCursor(null, 'prev').onsuccess = (event) => {
            const cursor = event.target.result
            if (cursor) {
                this.view.setEndIndex(cursor.key + 1)
                console.log('End index: ' + cursor.key)
            } else {
                this.view.setEndIndex(1)
            }
            this.view.setProducts(this.products)
            this.view.render()
        }
        store.openCursor(null, 'prev').onerror = () => {
            console.log('Error retrieving end index')
        }
    }

    // delete a product from database
    delete(index) {
        const transaction = this.db.transaction(['Carrito'], 'readwrite')
        const store = transaction.objectStore('Carrito')
        const request = store.delete(index)
        request.onsuccess = () => {
            this.products = this.products.filter((product) => product.id !== product.id)
            this.view.table.removeChild(document.getElementById(index))
            console.log('Product deleted successfully', index)
        }

        request.onerror = () => {
            console.log('Error deleting product')
        }
    }

    update(product) {
        let transaction = this.db.transaction(['Carrito'], 'readwrite')
        let store = transaction.objectStore('Carrito')
        let request = store.put(product)

        request.onsuccess = () => {
            this.products.push(product)
            console.log('Product updated successfully')
        }

        request.onerror = () => {
            console.log('Error updating product')
        }
    }
}
