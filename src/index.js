const path = require("path")
const express = require("express")
const handlebars = require("express-handlebars")
const morgan = require("morgan")
const app = express()
const port = 3000

// Sửa đổi đường dẫn mặc định "/" -> "src/public/"
app.use(express.static(path.join(__dirname, "public")))

// HTTP logger
app.use(morgan("combined"))


// Template engine
// Sửa đổi đuôi file template mặc định "handlebars" -> "hbs"
app.engine("hbs", handlebars({
  extname: ".hbs"
}))
app.set("view engine", "hbs")

// Thay đổi đường dẫn mặc định vào file views
app.set("views", path.join(__dirname, "resources/views"))



app.get('/', (req, res) => {
  res.render("home")
})

app.get('/news', (req, res) => {
  res.render("news")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
