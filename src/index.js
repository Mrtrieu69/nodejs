const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require("method-override")

const sortMiddleWare = require("./app/middlewares/sortMiddleware")

const app = express();
const port = 3000;

const route = require('./routes');
const db = require("./config/db")

// connect to DB
db.connect()



// Sửa đổi đường dẫn mặc định "/" -> "src/public/"
app.use(express.static(path.join(__dirname, 'public')));

// Gọi middleware để xử lý dữ liệu được submit từ form bằng method POST
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Cài đặt để sử dụng được PUT/ DELETE trong RESTfull API
app.use(methodOverride("_method"))


// Add middleware
app.use(sortMiddleWare)

// HTTP logger
// app.use(morgan("combined"))

// Template engine
// Sửa đổi đuôi file template mặc định "handlebars" -> "hbs"
// Viết thêm hàm sum để tính toán, render ra html
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require("./helpers/handlebars")
        }
    ),
);
app.set('view engine', 'hbs');

// Thay đổi đường dẫn mặc định vào file views
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
