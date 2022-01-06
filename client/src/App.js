import { Routes, Route } from 'react-router-dom';

import Header from './components/header';
import Snackbar from './components/snackbar';
import Foodlist from './pages/foodlist';
import Error404 from './pages/error404';
import Home from './pages/home';
import AddFood from './pages/addfood';

import AppState from './context/AppState';

function App() {
    return (
        <AppState>
            <Header className="header" name="octagon" />
            <Snackbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/foodlist" element={<Foodlist />} />
                <Route path="/addfood/:pid" element={<AddFood />} />
                <Route path="/*" element={<Error404 />} />
            </Routes>
        </AppState>
    );
}

export default App;
