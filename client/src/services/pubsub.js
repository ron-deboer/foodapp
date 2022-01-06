const PubSub = (function () {
    /*
     * private members
     */
    const _events = {};

    const _emit = (eventName, ...args) => {
        _getEventByName(eventName).forEach(
            function (fn) {
                fn.apply(this, args);
            }.bind(this)
        );
    };

    const _getEventByName = (eventName) => {
        if (typeof _events[eventName] === 'undefined') {
            _events[eventName] = new Set();
        }
        return _events[eventName];
    };

    /*
     * public members
     */
    class PubSub {
        on(eventName, fn) {
            _getEventByName(eventName).add(fn);
        }

        off(eventName, fn) {
            _getEventByName(eventName).delete(fn);
        }

        emit(eventName, args) {
            _emit(eventName, eventName, args);
        }

        topic = {
            SHOW_SNACKBAR: 'SHOW_SNACKBAR',
            STORE_UPDATED: 'STORE_UPDATED',
        };
    }

    return PubSub;
})();

export default new PubSub();
