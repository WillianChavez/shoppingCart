export default class Model {
    constructor(dbName, dbVersion, view) {
        // properties
        this.dbName = dbName
        this.dbVersion = dbVersion
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
            this.readData()
        }

        request.onupgradeneeded = (event) => {
            this.db = event.target.result

            let store = this.db.createObjectStore('Carrito', { keyPath: 'name' })

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
        let request = store.add(product)

        request.onsuccess = () => {
            this.readData()
            console.log('Product added successfully')
        }

        request.onerror = () => {
            console.log('Error adding product')
        }
    }

    readData() {
        let transaction = this.db.transaction(['Carrito'])
        let store = transaction.objectStore('Carrito')
        let request = store.getAll()

        request.onsuccess = (event) => {
            this.view.render(event.target.result)
            console.log('Data read successfully')
        }

        request.onerror = () => {
            console.log('Error retrieving products')
        }
    }

    delete(key) {
        const transaction = this.db.transaction(['Carrito'], 'readwrite')
        const store = transaction.objectStore('Carrito')
        const request = store.delete(key)
        request.onsuccess = () => {
            this.readData()
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
            console.log('Product updated successfully')
        }

        request.onerror = () => {
            console.log('Error updating product')
        }
    }
}
