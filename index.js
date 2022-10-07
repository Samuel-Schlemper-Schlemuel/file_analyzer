const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const {name, ext} = path.parse(file.originalname)
        cb(null, `${name}${ext}`)
    }
})

const upload = multer({storage})

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Home.html')
})

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    const {filename, size, mimetype} = req.file
    return res.json({'name': filename, 'type': mimetype,'size': size})
})

app.listen(PORT)