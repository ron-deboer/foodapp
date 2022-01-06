import { db } from '../firebase-api';

const FoodRepository = (function () {
    /*
     * private members
     */
    const COLLECTION_NAME = 'Food';
    const urls = {
        Host: 'http://127.0.0.1:3030/',
        FoodList: 'food/all',
    };

    /*
     * public members
     */
    class FoodRepository {
        fetchAllFoods() {
            function transform(item, id) {
                return {
                    id: id,
                    name: item.name,
                    category: item.category,
                    calories: item.calories_per_100g,
                    carbs: item.carbs_per_100g,
                };
            }
            // **** firebase
            // return new Promise(async function (resolve, reject) {
            //     const collObj = db.collection(COLLECTION_NAME);
            //     const data = await collObj.get();
            //     const resp = data.docs.map((item) => {
            //         const row = transform(item.data(), item.id);
            //         return row;
            //     });
            //     resolve(resp);
            // });

            // **** mariadb
            const url = urls.Host + urls.FoodList;
            return fetch(url).then(async (resp) => {
                const respData = await resp.json();
                const foods = respData.data.map((item) => {
                    const row = transform(item, item.id);
                    return row;
                });
                return foods;
            });
        }

        insertFood(item) {
            function transform(item) {
                return {
                    Name: item.name,
                    Category: item.category,
                    CaloriesPer100g: item.calories,
                    CarbsPer100g: item.carbs,
                };
            }
            const doc = transform(item);
            return new Promise(async function (resolve, reject) {
                const collObj = db.collection(COLLECTION_NAME);
                const resp = await collObj.add(doc);
                resolve(true);
            });
        }

        updateFood(item) {
            function transform(item) {
                return {
                    Name: item.name,
                    Category: item.category,
                    CaloriesPer100g: item.calories,
                    CarbsPer100g: item.carbs,
                };
            }
            const doc = transform(item);
            return new Promise(async function (resolve, reject) {
                let docObj = db.collection(COLLECTION_NAME).doc(`${item.id}`);
                const resp = await docObj.update(doc);
                resolve(true);
            });
        }
    }
    return FoodRepository;
})();

export default new FoodRepository();
