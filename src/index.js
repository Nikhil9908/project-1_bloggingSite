const express = require('express')
const bodyparser = require('body-parser')
const route = require("./routes/route")
const { default: mongoose } = require('mongoose');
const app = express()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Nikhil99:YMdCuusWj73Jr20o@cluster0.wtmewxp.mongodb.net/nikhil9908-db", {
    useNewUrlParser: true
})
    .then(() => console.log("Mongoose is connected"))
    .catch(err => console.log(err));


app.use("/", route)

app.listen(process.env.PORT || 3000, function () {
    console.log("Express app runing on port" + (process.env.PORT || 3000))
})





