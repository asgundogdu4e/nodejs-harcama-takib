const { pool } = require("./pool.js");
const { sendResult } = require("./../util/response.js");

const getCikislar = (request, response) => {
    pool.query('SELECT * FROM cikislar ORDER BY tarih', (error, results) => {
        if (error) {
            sendResult(response, null, error);
        } else {
            sendResult(response, results.rows, null);
        }
    })
}

const getCikisById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM cikislar WHERE id = $1', [id], (error, results) => {
        if (error) {
            sendResult(response, null, error);
        } else {
            sendResult(response, results.rows, null);
        }
    })
}

const createCikis = (request, response) => {
    const { tarih, tur, miktar } = request.body

    pool.query('INSERT INTO cikislar (tarih, tur, miktar) VALUES ($1, $2, $3) RETURNING *', [tarih, tur, miktar], (error, results) => {
        if (error) {
            sendResult(response, null, error);
        } else {
            sendResult(response, results.rows, null);
        }
    })
}


const updateCikis = (request, response) => {
    const id = parseInt(request.params.id)
    const { tarih, tur, miktar } = request.body

    pool.query(
        'UPDATE cikislar SET tarih = $1, tur = $2, miktar = $3 WHERE id = $4',
        [tarih, tur, miktar, id],
        (error, results) => {
            if (error) {
                sendResult(response, null, error);
            } else {
                pool.query('SELECT * FROM cikislar WHERE id = $1', [id], (error, results) => {
                    if (error) {
                        sendResult(response, null, error);
                    } else {
                        sendResult(response, results.rows, null);
                    }
                })
            }
        })
}

const deleteCikis = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM cikislar WHERE id = $1', [id], (error, results) => {
        if (error) {
            sendResult(response, null, error);
        } else {
            sendResult(response, { rowCount: results.rowCount }, null, results.rowCount);
        }
    })
}

module.exports = {
    getCikislar,
    getCikisById,
    createCikis,
    updateCikis,
    deleteCikis,
}