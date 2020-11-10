#!/usr/bin/env node

const os = require('os')
const fs = require('fs')
const fsx = require('fs-extra')
const http = require('http')
const cors = require('cors')
const childProcess = require('child_process')
const express = require('express')
const program = require('commander')
const stripAnsi = require('strip-ansi')
const socketIo = require('socket.io')
const jsBeautify = require('js-beautify')
const config = require('./config.json')

program.version('0.0.1').parse(process.argv)

const app = express()
const server = http.Server(app)
const io = socketIo(server)
const root = `${__dirname}/${config.root}`
const staticRoot = `${__dirname}/static`

if (fs.existsSync(root) === false) {
    fs.mkdirSync(`${root}`)
    fs.mkdirSync(`${root}/${config.projectDir}`)
    fs.mkdirSync(`${root}/${config.releaseDir}`)
}

let nowCode = 0

app.use(cors())
app.use(express.static(staticRoot))
app.use(express.json({ limit: '100mb' }))
app.use(function (req, res, next) {
    let code = Number(req.headers.code)
    if (!req.headers.code) {
        return next()
    }
    if (code === nowCode) {
        return next()
    }
    if (code > nowCode) {
        nowCode = code
        return next()
    }
    else {
        res.statusCode = '422'
        res.json({
            error: '你同時啟用了兩個視窗'
        })
    }
})

app.get('*', function(req, res) {
    let html = fs.readFileSync(`${staticRoot}/index.html`)
    res.send(html.toString())
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
    res.json({
        id
    })
    let process = childProcess.exec(`cd ${__dirname} && ${script}`)
    process.stdout.on('data', data => {
        io.emit(id, {
            type: 'data',
            data: stripAnsi(data).trim()
        })
    })
    process.stdout.on('error', e => {
        console.error(e)
    })
    process.on('error', e => {
        console.error(e)
    })
    process.on('exit', () => {
        io.emit(id, {
            type: 'exit'
        })
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
    let url = `http://${config.host}:${config.port}`
    let platform = os.platform()
    if (platform === 'win32') {
        childProcess.exec(`start ${url}`)
    }
    if (platform === 'linux' || platform === 'darwin') {
        childProcess.exec(`open ${url}`)
    }
    console.log(`${config.name}正在運行中: ${url}`)
})
