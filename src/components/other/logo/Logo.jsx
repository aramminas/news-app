import {Link} from 'react-router-dom';
/* styles */
import "./Logo.scss";

const Logo = () => {
    return (
        <span className="logo-content">
            <Link to="/">
                <span className="logo-image">
                    <img src="/assets/images/newspaper-logo.svg" alt="logo"/>
                </span>
                <span>News App</span>
            </Link>
        </span>
    );
}

export default Logo;