var mysql2 = require('mysql2');

module.exports = {
    pool: function () {
        return mysql2.createPool({
            host: "10.241.132.93",
            database: "PERACESDB",
            user: "peracesadmin",
            password: "Welcome123!",
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });
    }
}
