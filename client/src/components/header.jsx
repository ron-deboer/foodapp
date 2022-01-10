import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    const { state, setUserAuth } = useContext(AppContext);
    let navMenu = null;
    let navigate = useNavigate();

    const signOut = () => {
        setUserAuth(false);
        navigate('/');
    };

    if (state.isAuth) {
        navMenu = (
            <div className="nav-right">
                <Link to="/" className="text-white">
                    Home
                </Link>
                <Link to="/foodlist" className="text-white">
                    Food List
                </Link>
                <a onClick={signOut} className="text-white" style={{ cursor: 'pointer' }}>
                    Sign Out
                </a>
            </div>
        );
    }

    return (
        <nav className="nav bg-header no-margin">
            <div className="nav-left">
                <Link to="/" className="logo text-white text-uppercase">
                    {props.name}
                </Link>
            </div>
            {navMenu}
        </nav>
    );
}
