import { useState, useEffect } from 'react';
import PubSub from '../services/pubsub';

export default function Snackbar() {
    const [message, setMessage] = useState();

    useEffect(() => {
        PubSub.on(PubSub.topic.SHOW_SNACKBAR, showSnackbar);
        return function cleanup() {
            PubSub.off(PubSub.topic.SHOW_SNACKBAR, showSnackbar);
        };
    }, []);

    const showSnackbar = (type, msg) => {
        let x = document.getElementById('snackbar');
        if (msg.type === 'error') {
            x.classList.replace('hide', 'show-error');
        } else if (msg.type === 'success') {
            x.classList.replace('hide', 'show-success');
        } else {
            x.classList.replace('hide', 'show');
        }
        setMessage(msg.text);
        setTimeout(function () {
            x.classList.remove('show', 'show-error', 'show-success');
            x.classList.add('hide');
        }, 2000);
    };

    return (
        <div id="snackbar" className="is-full-width hide">
            {message}
        </div>
    );
}
