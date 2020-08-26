let fs = require('fs')
let fsx = require('fs-extra')
let config = require('../config.json')
let express = require('express')
let app = express()

app.use(express.json())

app.post('/read', function(req, res) {
    let { name } = req.body
    res.send(fs.readFileSync(name))
})

app.post('/readdir', function(req, res) {
    let { name } = req.body
    res.send(JSON.stringify(fs.readdirSync(name)))
})

app.post('/mkdir', function(req, res) {
    let { name } = req.body
    if (fs.existsSync(name) === false) {
        fs.mkdirSync(name)
    }
    res.send()
})

app.post('/rmdir', function(req, res) {
    let { name } = req.body
    fsx.removeSync(name)
    res.send()
})

app.post('./write', function(req, res) {
    let { path, content } = req.body
    fs.writeFileSync(path, content)
    res.send()
})

app.listen(config.port, config.host, () => {
    console.log('OK')
})