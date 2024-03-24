const express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')

let connects = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vue3'
})
connects.connect()


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express()
const port = 3000

app.use(jsonParser)
app.use(urlencodedParser)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/login', (req, res) => {
    let { name, pwd } = req.body;
    // if (username === '123' && password === '123') {
    //     res.send({ msg: '账号密码正确', status: 200 })
    // } else {
    //     res.send({ msg: '账号密码错误', status: 500 })
    // }
    // sql语句
    let sql = "select * from admin_user where name='" + name + "' and pwd = '" + pwd + "' "
    connects.query(sql, (err, results) => {
        console.log(err, results,'王浩天');
        if(results.length > 0) {
            res.send({ msg: '账号密码正确', status: 200 ,})
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})