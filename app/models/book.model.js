const Book = function() {};

Book.fromApiList = (apiList) => {
    let books = {
        "items": []
    }
    if ("items" in apiList) 
        Object.keys(apiList["items"]).forEach(function(key) {
            var val = apiList["items"][key];
            books["items"].push({
                    "id": val.id,
                    "title": val.volumeInfo.title,
                    "authors": val.volumeInfo.authors,
                    "publishedDate": val.volumeInfo.publishedDate,
                    "pageCount": val.volumeInfo.pageCount,
                    "previewLink": val.volumeInfo.previewLink
                }
            )
        });
    return books;
};

module.exports = Book;
