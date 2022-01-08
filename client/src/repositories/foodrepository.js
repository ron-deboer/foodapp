const FoodRepository = (function () {
    /*
     * private members
     */
    const COLLECTION_NAME = 'Food';
    const urls = {
        Host: 'http://127.0.0.1:3030/',
        ListFoods: 'food/all',
        SaveFood: 'food/save',
        RemoveFood: 'food/remove',
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
            const url = `${urls.Host}${urls.ListFoods}`;
            return fetch(url).then(async (response) => {
                const resp = await response.json();
                const foods = resp.data.map((item) => {
                    const row = transform(item, item.id);
                    return row;
                });
                return foods;
            });
        }

        insertFood(item) {
            function transform(item) {
                return {
                    name: item.name,
                    category: item.category,
                    calories_per_100g: item.calories,
                    carbs_per_100g: item.carbs,
                };
            }
            const data = transform(item);
            const url = `${urls.Host}${urls.SaveFood}/-1`;
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            }).then((resp) => {
                const response = resp.json();
                return response;
            });
        }

        updateFood(item) {
            function transform(item) {
                return {
                    name: item.name,
                    category: item.category,
                    calories_per_100g: item.calories,
                    carbs_per_100g: item.carbs,
                };
            }
            const data = transform(item);
            const url = `${urls.Host}${urls.SaveFood}/${item.id}`;
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            }).then((resp) => {
                const response = resp.json();
                return response;
            });
        }

        removeFood(id) {
            const url = `${urls.Host}${urls.RemoveFood}/${id}`;
            return fetch(url, {
                method: 'DELETE',
            }).then((resp) => {
                const response = resp.json();
                return response;
            });
        }
    }
    return FoodRepository;
})();

export default new FoodRepository();
