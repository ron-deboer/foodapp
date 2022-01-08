'use strict';

const Router = require('express');
const foodRepo = require('../repo/foodRepository');

const getFoodRoutes = (app, config) => {
    const router = new Router();

    router
        .get('/all', (req, res, next) => {
            foodRepo.getAll().then(resp => {
                res.json(resp);
            });
        })
        .get('/get/:id', (req, res) => {
            const id = parseInt(req.params.id);
            foodRepo.getById(id).then(resp => {
                res.json(resp);
            });
        })
        .delete('/remove/:id', (req, res, next) => {
            const id = parseInt(req.params.id);
            const result = foodRepo.remove(id).then(resp => {
                res.json(resp);
            });
        })
        .post('/save/:id', (req, res, next) => {
            const id = parseInt(req.params.id);
            const food = req.body;
            const result = foodRepo.save(id, food).then(resp => {
                res.json(resp);
            });
        });

    app.use('/food', router);
};

module.exports = getFoodRoutes;