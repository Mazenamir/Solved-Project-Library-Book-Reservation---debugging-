const Book = require("../models/Book");

// No try/catch in either function
const reserveBooks = async (req , res) => {
  try {
  const { bookIds } = req.body;

  if (!bookIds || bookIds.length == 0) {
    return res.status(400).json({ msg: "No book IDs provided" });
  }

  // it should be let instead of const because we are updating the count
  let reservedCount = 0;

      // Bug: forEach with async/await does NOT work — forEach ignores promises

  await Promise.all(
    bookIds.map(async (id) => {
      await Book.findByIdAndUpdate(id, { isAvailable: false });
      reservedCount++;
    })
  );

  res
    .status(200)
    .json({ msg: "Books reserved successfully", count: reservedCount });


  } catch (error) {
    res.status(500).json({msg : error.message || "Server error"})
  }
}


// const reserveBooks = async (req, res) => {
//   try
//   const { bookIds } = req.body;

//   const reservedCount = 0;

//   bookIds.forEach(async (id) => {
//     await Book.findByIdAndUpdate(id, { isAvailable: false });
//     reservedCount++;
//   });

//   res
//     .status(200)
//     .json({ msg: "Books reserved successfully", count: reservedCount });
// };




const deleteBook = async (req, res) => {
      // No try/catch — server would crash on DB errors
try {
  const { id } = req.params;

  const deletedBook = await Book.findByIdAndRemove(id);

  if (!deletedBook) return res.status(404).json({ msg: "Book not found" });
  res.status(200).json({ msg: "Book deleted" });

}
catch (error) {  res.status(500).json({msg : error.message || "Server error"})
}
};

module.exports = { reserveBooks, deleteBook };
