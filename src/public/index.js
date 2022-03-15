import { options } from "../../mysqlite3/options/mysqlite3config";
import { knex } from "knex";

const database = knex(options)

const socket = io()
let form = document.getElementById('form')
let title = document.getElementById('title')
let price = document.getElementById('price')
let thumbnail = document.getElementById('thumbnail')


Swal.fire({
    title: "Log In",
    input: "text",
    text: "Ingresa tu mail",
    inputValidator: (value) => {
        return !value && "Por favor ingresa tu mail para continuar"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
})

socket.on('newUser', (data) => {
    Swal.fire({
        icon: "success",
        text: "Usuario nuevo encontrado",
        toast: true,
        position: "top-right"
    })
})

form.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        socket.emit('message', { title: title.value, price: price.value, thumbnail: thumbnail.value })
    }
})

const processDatabase = async () => {
    let tableExists = await database.schema.hasTable('products');
    if (tableExists) {
        await database.schema.dropTable('products');
    }
    await database.schema.createTable('products', table => {
        table.increments('id')
        table.string('title', 20)
        table.integer('price')
        table.string('thumbnail', 100)
    })
    await database('products').insert(products)
    let results = await database.from('products').select('*')
    let products = JSON.parse(JSON.stringify(results))
    console.log(products)
}

socket.on('products', data => {
    processDatabase()
})
