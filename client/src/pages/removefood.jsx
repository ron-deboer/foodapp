import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import PubSub from '../services/pubsub';
import useBeforeFirstRender from '../hooks/usebeforefirstrender';

import FoodStore from '../stores/foodstore';
import FormField from '../components/FormField';

const initialValue = {
    id: '',
    category: '',
    name: '',
    calories: '',
    carbs: '',
};

export default function Removefood(props) {
    const { pid } = useParams();
    const [food, setFood] = useState(initialValue);
    let navigate = useNavigate();

    const form = [
        { name: 'category', label: 'Category', type: 'text', readonly: true },
        { name: 'name', label: 'Name', type: 'text', readonly: true },
        { name: 'calories', label: 'Calories per 100g', type: 'number', readonly: true },
        { name: 'carbs', label: 'Carbs per 100g', type: 'number', readonly: true },
    ];

    useBeforeFirstRender(() => {
        setFood(FoodStore.getFood(parseInt(pid)));
    });

    const onSubmit = () => {
        FoodStore.removeFood(parseInt(pid));
        PubSub.emit(PubSub.topic.SHOW_SNACKBAR, { type: 'success', text: 'Remove food Success' });
        navigate('/foodlist');
    };

    return (
        <div className="container col-6" style={{ margin: 'auto' }}>
            <div className="card" style={{ marginTop: 20, padding: 50 }}>
                <header>
                    <h4>Remove Food</h4>
                </header>
                <form id="removefoodform">
                    {form.map((fld, idx) => {
                        return (
                            <FormField
                                key={idx}
                                type={fld.type}
                                name={fld.name}
                                value={food[fld.name]}
                                label={fld.label}
                                readonly={fld.readonly}
                            />
                        );
                    })}
                    <div className="button primary" onClick={onSubmit} style={{ marginTop: 20 }}>
                        Remove
                    </div>
                </form>
            </div>
            <div className="container is-center" style={{ marginTop: 20 }}>
                <Link to="/foodlist" className="button btn">
                    BACK
                </Link>
            </div>
        </div>
    );
}
