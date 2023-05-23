const Pool = require('pg').Pool
const pg = require('pg')

pg.types.setTypeParser(1114, function (stringValue) {
    return stringValue;  //1114 for time without timezone type
});

pg.types.setTypeParser(1082, function (stringValue) {
    return stringValue;  //1082 for date type
});
const pool = new Pool({
    user: 'u_harcama',
    host: 'localhost',
    database: 'db_harcama',
    password: 'sGg!54cU*',
    port: 5432,
})

module.exports = {
    pool
}