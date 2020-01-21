const mysql = require('mysql')
const http = require('http')
const url = require('url')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wjj19990620',
    database: 'tsc.com'
})
connection.connect()

// 登陆
const login = () => new Promise(resolve => {
    connection.query('select * from user', (error, data) => {
        if (error) {
            throw error
        }
        resolve(data)
    })
})

// 查询
const sele = (name) => new Promise(resolve => {
    let arr = JSON.parse(name)
    connection.query('select * from user where user=?', [arr.username], (error, data) => {
        if (error) {
            resolve(error)
        }
        resolve(data)
    })
})

// 注册
const reg = (name) => new Promise(resolve => {
    let arr = JSON.parse(name)
    connection.query('insert into user value (?,?,?,?,?)', [0, arr.name, arr.username, arr.password, arr.phone], (error, data) => {
        if (error) {
            throw error
        }
        resolve(data)
    })
})

// 修改密码
const changepassword = (name) => new Promise(resolve => {
    let arr = JSON.parse(name)
    connection.query('update user set password=? where user=?', [arr.password, arr.newuser], (error, data) => {
        if (error) {
            throw error
        }
        resolve(data)
    })
})

const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") {
        return
    }
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8', 'Access-Control-Allow-Origin': "*"});
    let urlString = req.url;
    let url1 = url.parse(urlString, true);
    // console.log(url1);
    let loginName = url1.pathname;

    if (loginName === '/login') {
        login().then(
            value => {
                res.end(JSON.stringify(value));
            })
    } else if (loginName === '/reg') {
        reg(url1.query.name)
            .then(value => {
                res.end(JSON.stringify(value))
            })
    } else if (loginName == '/sele') {
        sele(url1.query.name)
            .then(value => {
                res.end(JSON.stringify(value))
            })
    } else if (loginName == '/changepassword') {
        changepassword(url1.query.name)
            .then(value => {
                res.end(JSON.stringify(value))
            })
    }
})

server.listen(1217)
