'use strict';

const env = process.env;

const config = {
    version: process.env.VERSION || '1.1a',
    db: {
        host: env.DB_HOST || '127.0.0.1',
        port: env.DB_HOST || '3306',
        user: env.DB_USER || 'dbuser',
        password: env.DB_PASSWORD || 'radiata-pine',
        database: env.DB_NAME || 'foodsdb',
    },
};

module.exports = config;