const Book = require("../models/book.model.js");
const Bookmark = require("../models/bookmark.model.js");
const BookService = require("../service/book.api.js");

exports.findAll = async(req, res) => {
    try {
        const title = req.query.title;
        const author = req.query.author;
        const keywords = req.query.keywords;
        const page = req.query.page;
        
        let pageNumber = 1;
        let query = "";

        if (keywords)
            query += `${encodeURIComponent(keywords)}+`;
        if (title)
            query += `intitle:${title}+`;
        if (author)
            query += `inauthor:${author}+`;
        if (page && page > 0)
            pageNumber = page

        startIndex = (pageNumber * 10) - 10;
        query = query.substring(0, query.length - 1);
        
        let apiResponse = await BookService.searchForBooks(query, startIndex);
        let response = Book.fromApiList(apiResponse);
        response["pageNumber"] = pageNumber;
        response["isCached"] = apiResponse["isCached"];
        return res.send(response);
    }
    catch (ex)
    {
        console.trace(ex);
        return res.status(500).send({
            message: "Some error occurred"
        });
    }
};

exports.bookmark = async (req, res) => {
    try {
        let bookId = req.params.id;
        let userId = req["decodedToken"]["user"]["id"];
        const bookmark = new Bookmark({
            bookId: bookId,
            userId: userId
        });
    
        let bookmarkResponse = await Bookmark.getBookmarkByBookIdAndUserId(userId, bookId);
        if (bookmarkResponse) {
            return res.status(500).send({
                message: "Given book is already bookmarked"
            });
        }
        let createBookmarkResponse =  await Bookmark.create(bookmark);
        return res.send(createBookmarkResponse);
    }
    catch (ex)
    {
        console.trace(ex);
        return res.status(500).send({
            message: "Some error occurred"
        });
    }
  };

exports.deleteBookmark = async (req, res) => {
    try {
        let bookId = req.params.id;
        let userId = req["decodedToken"]["user"]["id"];
        let isBookmarkDeleted = await Bookmark.deleteBookmarkByBookIdAndUserId(userId, bookId);
        if (isBookmarkDeleted)
            return res.send({
                message: "Bookmark has been deleted"
            });
        else
            return res.status(404).send({
                message: "Bookmark not found"
            });
            
    }
    catch (ex)
    {
        console.trace(ex);
        return res.status(500).send({
            message: "Some error occurred"
        });
    }
};

exports.listBookmark = async (req, res) => {
    try {
        const page = req.query.page;
        let pageNumber = 1;
        let offset = 0
        
        if (page && page > 0)
            pageNumber = page
            
        offset = (pageNumber - 1) * 10

        let userId = req["decodedToken"]["user"]["id"];       
        let bookmarkResponse = await Bookmark.getBookmarkByUserId(userId, offset);
        
        return res.send(bookmarkResponse);
    }
    catch (ex)
    {
        console.trace(ex);
        return res.status(500).send({
            message: "Some error occurred"
        });
    }
};