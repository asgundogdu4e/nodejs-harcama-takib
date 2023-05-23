const { pool } = require("./pool.js");
const { sendResult } = require("./../util/response.js");

const getGirisler = (request, response) => {
    pool.query('SELECT * FROM girisler ORDER BY tarih', (error, results) => {
        if (error) {
            sendResult(response, null, error);
        } else {
            sendResult(response, results.rows, null);
        }
    })
}

const getGirisById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM girisler WHERE id = $1', [id], (error, results) => {
        if (error) {
            sendResult(response, null, error);
        } else {
            sendResult(response, results.rows, null);
        }
    })
}

const createGiris = (request, response) => {
    const { tarih, miktar } = request.body

    pool.query('INSERT INTO girisler (tarih, miktar) VALUES ($1, $2) RETURNING *', [tarih, miktar],
        (error, results) => {
            if (error) {
                sendResult(response, null, error);
            } else {
                sendResult(response, results.rows, null);
            }
        })
}

const updateGiris = (request, response) => {
    const id = parseInt(request.params.id)
    const { tarih, miktar } = request.body
    pool.query(
        'UPDATE girisler SET tarih = $1, miktar = $2 WHERE id = $3',
        [tarih, miktar, id],
        (error, results) => {
            if (error) {
                sendResult(response, null, error);
            } else {
                pool.query('SELECT * FROM girisler WHERE id = $1', [id], (error, results) => {
                    if (error) {
                        sendResult(response, null, error);
                    } else {
                        sendResult(response, results.rows, null);
                    }
                })
            }
        })
}

const deleteGiris = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM girisler WHERE id = $1', [id], (error, results) => {
        if (error) {
            sendResult(response, null, error);
        } else {
            sendResult(response, { rowCount: results.rowCount }, null, results.rowCount);
        }
    })
}

module.exports = {
    getGirisler,
    getGirisById,
    createGiris,
    updateGiris,
    deleteGiris,
}