import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
/*
 * FIREBASE CONFIG
 */
const firebaseConfig = {
    apiKey: 'AIzaSyD2rfXKDKeI2zbFnnvPKRNkt3lcF-hcSCg',
    authDomain: 'solidjs-test-app.firebaseapp.com',
    projectId: 'solidjs-test-app',
    storageBucket: 'solidjs-test-app.appspot.com',
    messagingSenderId: '605543131818',
    appId: '1:605543131818:web:c12f444b99144bbcc2fed3',
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const db = app.firestore();

/*
 * EMAIL + PASSWORD SIGNIN
 */
const signInWithEmailAndPassword = (email, password) => {
    return auth
        .signInWithEmailAndPassword(email, password)
        .then((resp) => resp)
        .catch((error) => false);
};
/*
 * REGISTER NEW USER WITH EMAIL + PASSWORD
 */
const registerWithEmailAndPassword = (name, email, password) => {
    return auth
        .createUserWithEmailAndPassword(email, password)
        .then((resp) => {
            return db.collection('users').add({
                uid: resp.user.uid,
                name,
                authProvider: 'local',
                email,
            });
        })
        .catch((error) => false);
};
/*
 * GOOGLE AUTH SIGNIN
 */
const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        const user = res.user;
        const query = await db.collection('users').where('uid', '==', user.uid).get();
        if (query.docs.length === 0) {
            await db.collection('users').add({
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
/*
 * SEND PASSWORD RESET LINK
 */
const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert('Password reset link sent!');
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
/*
 * LOGOUT
 */
const logout = () => {
    auth.signOut();
};

export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
};
