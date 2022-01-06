'use strict';

const Food = require('../json/food');
const helper = require('../services/helper');

class FoodRepository {
    constructor() {
        this.db = require('../db/mariadb');
    }

    getById(id) {
        return this.foods.get(id);
    }

    async getAll() {
        const rows = await this.db.query('SELECT * FROM food');
        const data = helper.emptyOrRows(rows);
        const meta = { page: 1 };
        return {
            data,
            meta
        }
    }

    remove() {
        const keys = Array.from(this.foods.keys());
        this.foods.delete(keys[keys.length - 1]);
    }

    save(food) {
        if (this.getById(food.id) !== undefined) {
            this.foods.set(food.id, food);
            return 'Updated food with id=' + food.id;
        } else {
            food.id = food.id || this.nextId++;
            this.foods.set(food.id, food);
            return 'Added food with id=' + food.id;
        }
    }
}

const foodRepository = new FoodRepository();

module.exports = foodRepository;