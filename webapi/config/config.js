'use strict';

const env = process.env;

const config = {
    version: process.env.VERSION || '1.1a',
    db: {
        host: env.DB_HOST || 'db_host',
        user: env.DB_USER || 'dbuser',
        password: env.DB_PASSWORD || 'radiata-pine',
        database: env.DB_NAME || 'foodsdb',
        waitForConnections: true,
        connectionLimit: env.DB_CONN_LIMIT || 2,
        queueLimit: 0,
        debug: env.DB_DEBUG || false
    },
};

module.exports = config;