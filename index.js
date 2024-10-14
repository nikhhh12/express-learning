import express from 'express'

const app = express()
const port = 4000
app.use(express.json())

let coffeeData = []
let nextId = 1

// add a new coffee
app.post('/coffes', (req,res) =>{

    const {name, price} = req.body
    const newCoffee = {id: nextId++,name , price}
    coffeeData.push(newCoffee)
    res.status(201).send(newCoffee)
})

// get all coffee
app.get('/coffes', (req,res) => {
    res.status(200).send(coffeeData)
})

// get a coffee with id
app.get('/coffes:id', (req,res) => {
    coffeeData.find(c => c.id === parseInt(req.params.id))
    if(!coffee){
        return res.status(404).send('coffee not found')
    }
    res.status(200).send(coffee)
})

// update coffee
app.put('/coffee/:id',(req,res) => {
    const coffee = coffeeData.find(c => c.id === parseInt(req.params.id))
    if(!coffee){
        return res.status(404).send('coffee not found')
    }
    const {name,price}=req.body
    coffee.name=name
    coffee.price=price
    res.send(200).send(coffee)
})

//delete coffee
app.delete('/coffee/:id', (req,res) => {
    const index = coffeeData.findIndex(c => c.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('coffee not found')
    }
    coffeeData.splice(index, 1)
    return res.status(204).send('deleted')
})


app.listen(port,() => {
    console.log(`Server is running at port: ${port}...`)
})