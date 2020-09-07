const fs = require('fs')
const fsx = require('fs-extra')
const http = require('http')
const cors = require('cors')
const childProcess = require('child_process')
const express = require('express')
const stripAnsi = require('strip-ansi')
const socketIo = require('socket.io')
const jsBeautify = require('js-beautify')
const config = require('./config.json')

const app = express()
const server = http.Server(app)
const io = socketIo(server)
const root = `./${config.root}`

if (fs.existsSync(root) === false) {
    fs.mkdirSync(`${root}`)
    fs.mkdirSync(`${root}/${config.projectDir}`)
    fs.mkdirSync(`${root}/${config.releaseDir}`)
}

app.use(cors())
app.use(express.json({ limit: '100mb' }))

app.get('/hello', function(req, res) {
    res.send('hello')
})

app.post('/read', function(req, res) {
    let { name } = req.body
    res.json({
        data: fs.readFileSync(`${root}/${name}`).toString()
    })
})

app.post('/remove', function(req, res) {
    let { name } = req.body
    res.json({
        data: fsx.removeSync(`${root}/${name}`)
    })
})

app.post('/readdir', function(req, res) {
    let { name } = req.body
    res.json({
        data: fs.readdirSync(`${root}/${name}`)
    })
})

app.post('/mkdir', function(req, res) {
    let { name } = req.body
    if (fs.existsSync(`${root}/${name}`) === false) {
        fs.mkdirSync(`${root}/${name}`)
    }
    res.json({
        data: true
    })
})

app.post('/rmdir', function(req, res) {
    let { name } = req.body
    fsx.removeSync(`${root}/${name}`)
    res.json({
        data: true
    })
})

app.post('/write', function(req, res) {
    let { path, content, beautify } = req.body
    if (beautify) {
        fs.writeFileSync(`${root}/${path}`, jsBeautify(content, { indent_size: 4 }))
    } else {
        fs.writeFileSync(`${root}/${path}`, content)
    }
    res.json({
        data: true
    })
})

app.post('/exec', function(req, res) {
    let id = 'exec-' + Date.now().toString()
    let script = req.body.script
    let process = childProcess.exec(script)
    process.stdout.on('data', data => {
        io.emit(id, {
            type: 'data',
            data: stripAnsi(data).trim()
        })
    })
    process.on('exit', () => io.emit(id, {
        type: 'exit'
    }))
    res.json({
        id
    })
})

app.post('/beautify', function(req, res) {
    let { text, indentSize } = req.body
    res.json({
        data: jsBeautify(text.trim(), {
            indent_size: indentSize
        })
    })
})

server.listen(config.port, config.host, () => {
    console.log(`${config.name}正在運行中: ${config.host}:${config.port}`)
})
