'use strict';

const Food = require('../json/food');
const helper = require('../services/helper');

class FoodRepository {
    constructor() {
        this.foods = [];
        this.db = require('../db/mariadb');
    }

    getById(id) {
        return this.foods.get(id);
    }

    getAll() {
        let sql = `SELECT * FROM food`;
        return this.query(sql).then(data => {
            return { data: data, meta: { page: 1 } };
        });
    }

    remove(id) {
        const keys = Array.from(this.foods.keys());
        this.foods = this.foods.filter(x => x.id !== id);
        let sql = `DELETE FROM food WHERE id=${id}`;
        return this.query(sql).then(data => {
            return { data: data, meta: { id: id } };
        });
    }

    save(id, item) {
        if (id >= 0) {
            return this.update(id, item)
        } else {
            return this.insert(item)
        }
    }

    update(id, item) {
        let arr1 = [];
        Object.keys(item).forEach((key) => {
            arr1.push(`${key}='${item[key]}'`);
        });
        const strKeyVals = arr1.join(', ');
        let sql = `UPDATE food SET ${strKeyVals} WHERE id=${id}`;
        return this.query(sql);
    }

    insert(item) {
        let keys = [];
        let vals = [];
        Object.keys(item).forEach((key) => {
            keys.push(`${key}`);
            vals.push(`'${item[key]}'`);
        });
        const strKeys = keys.join(', ');
        const strVals = vals.join(', ');
        let sql = `INSERT INTO food (${strKeys}) VALUES (${strVals})`;
        return this.query(sql);
    }

    query(sql, params) {
        // console.log(sql);
        return this.db.query(sql, params)
            .then(
                (resp) => {
                    return resp;
                }).catch(
                (err) => setImmediate(() => { throw err; }));
    }
}

const foodRepository = new FoodRepository();

module.exports = foodRepository;