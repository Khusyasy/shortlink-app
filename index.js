require("dotenv").config();
const express = require('express');
const path = require('path');

const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

require("./helpers/database");

const apiRouter = require("./routes/api")
const redirRouter = require("./routes/redir")
const usersRouter = require("./routes/users")

app.use("/api", apiRouter);

app.use("/users", usersRouter);

app.use("/", redirRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log('Server is listening on port ' + port);