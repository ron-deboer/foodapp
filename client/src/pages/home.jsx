import { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

import { auth, signInWithEmailAndPassword, registerWithEmailAndPassword } from '../firebase-api';
import { useAuthState } from 'react-firebase-hooks/auth';

import PubSub from '../services/pubsub';

function Home(props) {
    const { state, setUserAuth } = useContext(AppContext);
    const [signup, setSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    const signIn = () => {
        signInWithEmailAndPassword(email, password).then((resp) => {
            if (!resp) {
                PubSub.emit(PubSub.topic.SHOW_SNACKBAR, { type: 'error', text: 'Log In Failed' });
                return;
            }
        });
        setUserAuth(true);
        PubSub.emit(PubSub.topic.SHOW_SNACKBAR, { type: 'success', text: 'Sign in Success' });
        setTimeout(() => {
            setEmail('');
            setPassword('');
            navigate('/foodlist');
        }, 1000);
    };

    const signUp = () => {
        registerWithEmailAndPassword(name, email, password).then((resp) => {
            if (!resp) {
                PubSub.emit(PubSub.topic.SHOW_SNACKBAR, { type: 'error', text: 'Sign Up Failed' });
                return;
            }
        });
        setEmail('');
        setPassword('');
        setSignUp(false);
        PubSub.emit(PubSub.topic.SHOW_SNACKBAR, { type: 'success', text: 'Sign Up Success' });
    };

    const loginForm = (
        <form className="card col-6" style={{ maxWidth: 500, padding: 40, marginTop: 120 }}>
            <header className="is-left" style={{ paddingLeft: 10 }}>
                <h4>Log In</h4>
            </header>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-12"
                placeholder="email"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-12"
                placeholder="password"
                type="password"
            />
            <footer className="" style={{ paddingLeft: 10 }}>
                <div className="button primary" onClick={signIn}>
                    Log In
                </div>
                <p style={{ marginTop: 10, fontSize: 12, textTransform: 'uppercase' }}>
                    Don't have an account ? &nbsp;
                    <a
                        href="/#"
                        className=""
                        onClick={() => {
                            setSignUp(true);
                        }}
                    >
                        Sign Up
                    </a>
                </p>
            </footer>
        </form>
    );

    const signupForm = (
        <form className="card col-6" style={{ padding: 40, marginTop: 120 }}>
            <header className="is-left" style={{ paddingLeft: 10 }}>
                <h4>Sign Up</h4>
            </header>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-12"
                placeholder="name"
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-12"
                placeholder="email"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-12"
                placeholder="password"
                type="password"
            />
            <footer className="" style={{ paddingLeft: 10 }}>
                <div className="button primary" onClick={signUp}>
                    Sign Up
                </div>
                <p style={{ marginTop: 10, fontSize: 12, textTransform: 'uppercase' }}>
                    Already have an account ? &nbsp;
                    <a
                        href="/#"
                        className=""
                        onClick={() => {
                            setSignUp(false);
                        }}
                    >
                        Log In
                    </a>
                </p>
            </footer>
        </form>
    );
    return (
        <>
            <div className="is-full-screen bg-blue text-center bd-none">
                <h1 className=" text-white">HOME</h1>
                <div className="flex-container">{signup ? signupForm : loginForm}</div>
            </div>
            <footer className="is-center">eXpress - Ron deBoer - Melbourne, Australia</footer>
        </>
    );
}
export default Home;
