const sql = require("./db.js");

const Bookmark = function(bookmark) {
  this.bookId = bookmark.bookId;
  this.userId = bookmark.userId;
};

Bookmark.create = async (newBookmark) => {
  const query = sql.format("INSERT INTO bookmarks SET ?", [newBookmark]);
  let [res] = await sql.execute(query);
  
  console.log("created bookmark: ", { id: res.insertId, ...newBookmark });
  return { 
    id: res.insertId, 
    message: "Bookmark has been created" 
  };
};

Bookmark.getBookmarkByBookIdAndUserId = async (userId, bookId) => {
  let bookmark = null;
  const query = `SELECT * from bookmarks WHERE userId ='${userId}' AND bookId = '${bookId}'`;
  const [response] = await sql.execute(query);
  if (response.length)
    bookmark = response[0]

  return bookmark
};

Bookmark.deleteBookmarkByBookIdAndUserId = async (userId, bookId) => {
  let isBookmarkDeleted = false
  const query = `DELETE from bookmarks WHERE userId ='${userId}' AND bookId = '${bookId}'`;
  const [response] = await sql.execute(query);
  
  if (response.affectedRows > 0)
    isBookmarkDeleted = true;
  
  return isBookmarkDeleted
};

Bookmark.getBookmarkByUserId = async (userId, offset = 0) => {
    let bookmark = [];
    const query = `SELECT * from bookmarks WHERE userId ='${userId}' LIMIT 10 OFFSET ${offset}`;
    const [response] = await sql.execute(query);
    if (response.length)
    {
      Object.keys(response).forEach(function(key) {
          var val = response[key];
          bookmark.push({
                  "id": val.id,
                  "bookId": val.bookId
              }
          )
      });
    }
    return bookmark
};

module.exports = Bookmark;
