export default class Model {
    constructor(dbName, dbVersion, view) {
        this.dbName = dbName
        this.dbVersion = dbVersion
        this.products
        this.view = view

        this.open(this.dbName, this.dbVersion)

        this.db
    }

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
                this.view.setEndIndex(0)
                console.log('Database upgrade completed')
            }
        }
    }

    add(product) {
        let transaction = this.db.transaction(['Carrito'], 'readwrite')
        let store = transaction.objectStore('Carrito')
        let request = store.add(product)

        request.onsuccess = () => {
            this.products.push(product)
            console.log('Product added successfully')
        }

        request.onerror = () => {
            console.log('Error adding product')
        }
    }

    getAll() {
        let transaction = this.db.transaction(['Carrito'])
        let store = transaction.objectStore('Carrito')
        let request = store.getAll()
        console.log('getAll')

        request.onsuccess = (event) => {
            this.products = event.target.result
            this.getEndIndex()
            this.view.setProducts(this.products)
            this.view.render()

            console.log('getAll success')
        }

        request.onerror = () => {
            console.log('Error retrieving products')
        }
    }

    getEndIndex() {
        const transaction = this.db.transaction(['Carrito'])
        const store = transaction.objectStore('Carrito')
        store.openCursor(null, 'prev').onsuccess = (event) => {
            const cursor = event.target.result
            if (cursor) {
                this.view.setEndIndex(cursor.key)
                console.log('End index: ' + cursor.key)
            }
        }
        store.openCursor(null, 'prev').onerror = () => {
            console.log('Error retrieving end index')
        }
    }

    delete(index) {
        let product = this.getByIndex(index)
        if (product) {
            this.products = this.products.filter((product) => product.id !== product.id)
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
