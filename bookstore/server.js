const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('./Pages/home')
})

app.listen(9000, ()=>{
    console.log('Server Start');
})