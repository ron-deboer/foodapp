import { Link } from 'react-router-dom';

function Error404(props) {
    return (
        <div className="no-margin is-full-screen bg-red text-white text-center">
            <h1 className="">ERROR 404</h1>
            <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p>
                <Link to="/" className="button btn bg-white text-dark">
                    HOME
                </Link>
            </p>
        </div>
    );
}

export default Error404;
