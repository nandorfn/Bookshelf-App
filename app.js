const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const _ = require('lodash')
const jsdom = require("jsdom")
const { JSDOM } = jsdom

mongoose.connect('mongodb://127.0.0.1:27017/storedBook');
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.static('script'))

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    status: Boolean
})

const Book = mongoose.model('Book', bookSchema)

app.get('/', async (req, res) => {
    try {
        const books = await Book.find({ status: false })
        const novels = await Book.find({ status: true })

        res.render('index', { books: books, novels: novels })
    } catch (err) {
        console.error(err);
        // Respond with error message
        res.status(500).send({ error: 'Error fetching books' })
    }
});


app.post('/books', async (req, res) => {
    try {
        // Create new Book instance from request body

        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
            status: req.body.status
        });

        // Save new book to MongoDB
        book.save();

        // Respond with success message
        res.status(201).send({ message: 'Book created successfully' });
    } catch (err) {
        console.error(err);
        // Respond with error message
        res.status(500).send({ error: 'Error creating book' });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).send({ error: 'Book not found' });
      }
      setTimeout(() => {
        res.redirect('/')
      }, 1000)
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Error deleting book' });
    }
  });
  



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})