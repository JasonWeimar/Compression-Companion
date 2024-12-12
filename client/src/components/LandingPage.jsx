import logoWithText from '../assets/logoWithText.png';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="logoContainer">
            <div>
                <img className="landingLogoStyle" src={logoWithText} alt="logo with text" />
            </div>
            <div className="loginRegContainer">
                <Link to={`/companion/auth`} className="logRegButtonStyle">Login | Register</Link>
            </div>
        </div>
    )
}

export default LandingPage;