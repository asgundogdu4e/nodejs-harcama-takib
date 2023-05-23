const { pool } = require("./pool.js");
const { sendResult } = require("./../util/response.js");

const getHarcamaTurleri = (request, response) => {
    pool.query('SELECT * FROM harcama_turu ORDER BY tur', (error, results) => {
        if (error) {
            sendResult(response, null, error);
        } else {
            sendResult(response, results.rows, null);
        }
    })
}

const getHarcamaTuruById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM harcama_turu WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createHarcamaTuru = (request, response) => {
    const { tur } = request.body

    pool.query('INSERT INTO harcama_turu (tur) VALUES ($1) RETURNING *', [tur], (error, results) => {
        if (error) {
            sendResult(response, null, error);
        } else {
            sendResult(response, results.rows, null);
        }
    })
}

const updateHarcamaTuru = (request, response) => {
    const id = parseInt(request.params.id)
    const { tur } = request.body

    pool.query(
        'UPDATE harcama_turu SET tur = $1 WHERE id = $2',
        [tur, id],
        (error, results) => {
            if (error) {
                sendResult(response, null, error);
            } else {
                pool.query('SELECT * FROM harcama_turu WHERE id = $1', [id], (error, results) => {
                    if (error) {
                        sendResult(response, null, error);
                    } else {
                        sendResult(response, results.rows, null);
                    }
                })
            }
        }
    )
}

const deleteHarcamaTuru = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM harcama_turu WHERE id = $1', [id], (error, results) => {
        if (error) {
            sendResult(response, null, error);
        } else {
            sendResult(response, { rowCount: results.rowCount }, null, results.rowCount);
        }
    })
}

module.exports = {
    getHarcamaTurleri,
    getHarcamaTuruById,
    createHarcamaTuru,
    updateHarcamaTuru,
    deleteHarcamaTuru,
}