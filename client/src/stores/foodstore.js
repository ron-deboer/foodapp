import FoodRepository from '../repositories/foodrepository';
import PubSub from '../services/pubsub';

const FoodStore = (function () {
    /*
     * private members
     */
    let foods = [];
    let errorTemplate = {
        id: 0,
        name: 'ERROR - FETCH FROM SERVER FAILED',
        category: '',
        calories: 0,
        carbs: 0,
    };

    /*
     * public members
     */
    class FoodStore {
        constructor() {}

        fetchFoods = () => {
            return FoodRepository.fetchAllFoods().then(
                (data) => {
                    foods = Object.assign([], data);
                    this.notify();
                    return foods;
                },
                (err) => {
                    foods = [errorTemplate];
                    this.notify();
                    return foods;
                }
            );
        };

        getFoods() {
            return foods.sort((i1, i2) => {
                return i1.calories - i2.calories;
            });
        }

        getFood(id) {
            return foods.find((x) => x.id === id);
        }

        addFood = (food) => {
            foods.push(food);
            FoodRepository.insertFood(food).then(() => {
                this.fetchFoods();
            });
        };

        updateFood = (food) => {
            const idx = foods.findIndex((x) => x.id === food.id);
            foods[idx] = Object.assign({}, food);
            FoodRepository.updateFood(food).then((resp) => {
                this.fetchFoods();
            });
        };

        removeFood = (id) => {
            foods = foods.filter((x) => x.id !== id);
            FoodRepository.removeFood(id).then(() => {
                this.fetchFoods();
            });
        };

        notify = () => {
            PubSub.emit(PubSub.topic.STORE_UPDATED, {});
        };
    }
    return FoodStore;
})();

export default new FoodStore();
