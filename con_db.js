var knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "112233",
        database: "hos"
    },
    pool: {
        afterCreate: (conn, done) => {
            conn.query("SET NAMES UTF8", err => {
                done(err, conn);
            });
        }
    }
});
module.exports = knex