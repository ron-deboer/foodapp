import FoodRepository from '../repositories/foodrepository';
import PubSub from '../services/pubsub';

const FoodStore = (function () {
    /*
     * private members
     */
    let foods = [];

    /*
     * public members
     */
    class FoodStore {
        constructor() {
            this.fetchFoods();
        }

        fetchFoods = () => {
            return FoodRepository.fetchAllFoods().then((data) => {
                foods = data;
                PubSub.emit(PubSub.topic.STORE_UPDATED, {});
                return foods;
            });
        };

        getFood(id) {
            return foods.find((x) => x.id === id);
        }

        getFoods() {
            return foods.sort((i1, i2) => {
                return i1.calories - i2.calories;
            });
        }

        addFood = (food) => {
            foods.push(food);
            FoodRepository.insertFood(food).then(() => {
                PubSub.emit(PubSub.topic.STORE_UPDATED, {});
            });
        };

        updateFood = (food) => {
            const idx = foods.findIndex((x) => x.id === food.id);
            foods[idx] = Object.assign({}, food);
            FoodRepository.updateFood(food).then(() => {
                PubSub.emit(PubSub.topic.STORE_UPDATED, {});
            });
        };
    }
    return FoodStore;
})();

export default new FoodStore();
