const AuthApi = (function () {
    /*
     * private members
     */
    const urls = {
        Host: 'http://127.0.0.1:3030/',
        AuthLogin: 'auth/login',
        AuthSignup: 'auth/signup',
    };

    let _email = '';
    let _password = '';

    /*
     * public members
     */
    class AuthApi {
        signInWithEmailAndPassword(auth) {
            const url = `${urls.Host}${urls.AuthLogin}`;
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(auth),
            }).then((resp) => {
                const response = resp.json();
                return response;
            });
        }

        signOut() {
            return new Promise(function (resolve, reject) {
                _email = '';
                _password = '';
                resolve(true);
            });
        }

        auth() {
            return _email !== '';
        }

        registerWithEmailAndPassword(email, password, name) {
            const url = `${urls.Host}${urls.AuthSignup}`;
            const payload = {
                name: name,
                email: email,
                password: password,
            };
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }).then((resp) => {
                const response = resp.json();
                return response;
            });
        }
    }

    return AuthApi;
})();

export default new AuthApi();
