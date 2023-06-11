const express = require('express')
const app = express()

const cors = require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')


app.use(express.urlencoded({extended: true}))
app.use(cors({origin: '*'}))
app.use(express.json())
app.use(morgan('dev'))
app.use(fileUpload())

app.set('view engine', 'ejs')


app.use(express.static("public"))

// set up the database if it doesn't exist
const dbSetup = require("./utils/db.setup.js");
dbSetup();

app.listen(4000, ()=>{
    console.log("App listening on port 4000");
})

app.get("/", (req, res)=>{
    res.render("index");
})

app.get("/dashboard", (req, res)=>{
    res.render("dashboard");
})

app.get("/report", (req, res)=>{
    res.render("report")
})

app.get('/referals', (req, res)=>{
    res.render('referal')
})
app.use("/deposit", require("./routes/deposit.js"));
app.use("/invest", require("./routes/invest"));
app.use("/login", require("./routes/signIn.js"));
app.use("/signup", require("./routes/signup.js"));
app.use("/withdraw", require("./routes/withdraw.js"));
app.use("/account", require("./routes/account.js"));
app.use('/xkse', require('./routes/api.js'));
const invest = require('./utils/investmenst.js');

setInterval(()=>{
    invest();
}, 3600000)