import express from 'express'

const app = express()

const port = 3000

app.use(express.json())

let teaData=[]
let nextId=1


// addimg a new tea
app.post('/teas',(req,res)=>{
    const {name,price} = req.body
    const newTea ={id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})


// geting and searching the tea 
app.get('/teas/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Not found")
    }else{
        return res.status(200).send(tea)
    }
})


//updation of tea

app.put('/teas/:id',(req,res)=>{
    const tea= teaData.find(t=> t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Not found")
    }
    const {name,price} = req.body
})


app.listen(port,()=>{
    console.log(`server is runnign at: ${port}...`)
})
