import book from "../src/models/Book.js"
import author from "../src/models/Author.js"

class BookController {
  static async list (req, res) {
    try {
      const list = await book.find({})
      res.status(200).json(list)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - List books failed` })
    }
  }

  static async getBookById (req, res) {
    try {
      const findBook = await book.findById(req.params.id)
      res.status(200).json(findBook)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Get book failed` })
    }
  }

  static async create (req, res) {
    try {
      const bookAuthor = await author.findById(req.body.author)
      const result = await book.create({ ...req.body, author: { ...bookAuthor._doc } })
      res.status(201).json({ message: 'Created with success!', book: result })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Create book failed` })
    }
  }

  static async update (req, res) {
    try {
      await book.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({ message: `Update book success` })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Get book failed` })
    }
  }

  static async delete (req, res) {
    try {
      await book.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: `Delete book success` })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Delete book failed` })
    }
  }

  static async findBookByPublisher (req, res) {
    try {
      const booksByPublisher = await book.find({ publisher: req.query.publisher })
      res.status(200).json(booksByPublisher)
    } catch (error) {
      res.status(500).json({ message: `Search failed - ${error}` })
    }
  }
}

export default BookController
