const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/bookStore')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const productSchema = new mongoose.Schema({
    bookid: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    booktype: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    publishdate: {
        type: Date,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }

}, { timestamps: true })

const productModel = mongoose.model('Book', productSchema)

app.set('view engine', 'ejs')

// home
app.get('/', (req, res) => {
    res.render('./Pages/home')
})

// retrive Data
app.get('/booklist', async (req, res) => {
    const books = await productModel.find()
    res.render('./Pages/index', { books: books })
})

// add data
app.get('/addbook', (req, res) => {
    res.render('./Pages/addbook')
})

// post data
app.post('/addbook', async (req, res) => {
    const book = req.body;

    const newBook = new productModel(book);
    await newBook.save();

    res.redirect('/booklist')
})


// deleteData
app.get('/deleteBook/:id', async (req, res) => {
    const userId = req.params.id;
    var result = await productModel.deleteOne(({ _id: userId }))
    res.redirect('/booklist')
})

// edit Data
app.get('/editBook/:id', async (req, res) => {
    const userId = req.params.id;

    const book = await productModel.findById(userId);

    res.render('./Pages/editbook', { book });
})

// post Data
app.post('/editBook/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedBookData = req.body;

    const updatedBook = await productModel.findByIdAndUpdate(userId, updatedBookData, { new: true });

    res.redirect('/booklist');
})

// port Listen at
app.listen(9000, () => {
    console.log('Server Start');    
})