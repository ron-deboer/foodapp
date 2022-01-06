'use strict';

const Router = require('express');
const foodRepo = require('../repo/foodRepository');

const getFoodRoutes = (app, config) => {
    const router = new Router();

    router
        .get('/get/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const result = foodRepo.getById(id);
            res.send(result);
        })
        .get('/all', async (req, res, next) => {
            try {
                res.json(await foodRepo.getAll());
            } catch (err) {
                console.error(`Error while getting quotes `, err.message);
                next(err);
            }
        })
        .get('/remove', (req, res) => {
            foodRepo.remove();
            const result = 'Last food remove. Total count: ' + foodRepo.foods.size;
            res.send(result);
        })
        .post('/save', (req, res) => {
            const food = req.body;
            const result = foodRepo.save(food);
            res.send(result);
        });

    app.use('/food', router);
};

module.exports = getFoodRoutes;