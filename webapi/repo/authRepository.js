'use strict';

const bcrypt = require("bcrypt");

class AuthRepository {

    constructor() {
        this.db = require('../db/mariadb');
    }

    signIn(email, password) {
        const _this = this;
        return new Promise(async function(resolve, reject) {
            let sql = `SELECT * FROM user WHERE email = '${email}';`;
            _this.query(sql, null).then(async resp => {
                if (resp.status !== 200) {
                    resolve({ status: false, data: null });
                    return;
                }
                const user = resp.data[0];
                const validPassword = await bcrypt.compare(password, user.pwhash);
                if (validPassword) {
                    resolve({ status: true, data: user });
                } else {
                    resolve({ status: false, data: null });
                }
            });
        });
    }

    signUp(email, password, name) {
        const _this = this;
        return new Promise(async function(resolve, reject) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            let sql = `INSERT INTO user (email, pwhash, name) VALUES ('${email}', '${hash}', '${name}');`;
            console.log(sql);
            _this.query(sql, null).then(async resp => {
                resolve({ status: true, resp: resp });
            });
        });
    }

    query(sql, params) {
        const _this = this;
        const isObject = function(a) {
            return (!!a) && (a.constructor === Object);
        };
        return new Promise(function(resolve, reject) {
            _this.db.query(sql, function(err, result, fields) {
                if (err) {
                    resolve({
                        status: 404,
                        data: null
                    });
                    return;
                }
                let resp = JSON.parse(JSON.stringify(result));
                if (isObject(resp)) {
                    resolve({
                        status: 200,
                        meta: resp
                    });
                    return;
                }
                if (resp.length === 0) {
                    resolve({
                        status: 404,
                        data: []
                    });
                    return;
                }
                resolve({
                    status: 200,
                    data: resp
                });
                return;
            });
        });
    }
}

const authRepository = new AuthRepository();
module.exports = authRepository;