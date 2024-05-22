const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://rsprkd:<password>@book-store-mern.btfuso2.mongodb.net/"
  )
  .then(() => console.log("Mongodb is connected"))
  .catch((e) => console.log(e));
