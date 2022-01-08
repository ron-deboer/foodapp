import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PubSub from '../services/pubsub';

import FoodStore from '../stores/foodstore';
import FoodDataTable from '../components/fooddatatable';

function Foodlist(props) {
    const [foods, setFoods] = useState();

    useEffect(() => {
        PubSub.on(PubSub.topic.STORE_UPDATED, getFoods);
        FoodStore.fetchFoods();
        return function cleanup() {
            PubSub.off(PubSub.topic.STORE_UPDATED, getFoods);
        };
    }, []);

    const getFoods = (type, msg) => {
        setFoods(FoodStore.getFoods());
    };

    if (!foods) {
        return (
            <div className="is-full-screen text-center">
                <h1 className="">FOOD CALORIE LIST</h1>
                <img src="./loading.gif" alt="loading..." className="centered" />;
            </div>
        );
    } else {
        return (
            <div className="is-full-screen text-center">
                <h1 className="">FOOD CALORIE LIST</h1>
                <FoodDataTable data={foods} />
                <p>
                    <button className="button btn" onClick={() => FoodStore.fetchFoods()}>
                        RELOAD FOOD LIST
                    </button>
                    <Link to="/addfood/-1" className="button btn">
                        ADD FOOD
                    </Link>
                </p>
            </div>
        );
    }
}

export default Foodlist;
