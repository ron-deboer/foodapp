'use strict';

class Food {
    constructor(id, name, category, calories, carbs) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.calories_per_100g = calories;
        this.carbs_per_100g = carbs;
    }
}

module.exports = Food;