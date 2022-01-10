'use strict';

const Router = require('express');
const authRepo = require('../repo/authRepository');

const getAuthRoutes = (app, config) => {
    const router = new Router();

    router
        .post('/login', (req, res, next) => {
            const auth = req.body;
            const result = authRepo.signIn(auth.email, auth.password).then(resp => {
                res.json(resp);
            });
        })
        .post('/signup', (req, res, next) => {
            const auth = req.body;
            const result = authRepo.signUp(auth.email, auth.password, auth.name).then(resp => {
                res.json(resp);
            });
        });

    app.use('/auth', router);
};

module.exports = getAuthRoutes;