const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
const dbGirisler = require('./queries/girisler')
const dbHarcamaTurleri = require('./queries/harcamaTurleri')
const dbCikislar = require('./queries/cikislar')
const cors = require('cors');

var allowedOrigins = ['http://localhost:3000', 'http://localhost'];

app.use(
    cors({ credentials: true, origin: true })
);

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/api/girisler', dbGirisler.getGirisler)
app.get('/api/girisler/:id', dbGirisler.getGirisById)
app.post('/api/girisler', dbGirisler.createGiris)
app.put('/api/girisler/:id', dbGirisler.updateGiris)
app.delete('/api/girisler/:id', dbGirisler.deleteGiris)

app.get('/api/harcamaTurleri', dbHarcamaTurleri.getHarcamaTurleri)
app.get('/api/harcamaTurleri/:id', dbHarcamaTurleri.getHarcamaTuruById)
app.post('/api/harcamaTurleri', dbHarcamaTurleri.createHarcamaTuru)
app.put('/api/harcamaTurleri/:id', dbHarcamaTurleri.updateHarcamaTuru)
app.delete('/api/harcamaTurleri/:id', dbHarcamaTurleri.deleteHarcamaTuru)

app.get('/api/cikislar', dbCikislar.getCikislar)
app.get('/api/cikislar/:id', dbCikislar.getCikisById)
app.post('/api/cikislar', dbCikislar.createCikis)
app.put('/api/cikislar/:id', dbCikislar.updateCikis)
app.delete('/api/cikislar/:id', dbCikislar.deleteCikis)