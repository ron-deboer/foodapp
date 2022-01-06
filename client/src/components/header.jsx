import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function Header(props) {
    const { state } = useContext(AppContext);

    let navMenu = null;
    if (state.isAuth) {
        navMenu = (
            <div className="nav-right">
                <Link to="/" className="text-white">
                    Home
                </Link>
                <Link to="/foodlist" className="text-white">
                    Food List
                </Link>
                <Link to="/signup" className="text-white">
                    Sign Up
                </Link>
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
