import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBikeSetupsService } from "../services/setup.service";
import logoSimple from '../assets/logoSimple.png';

const Header = () => {
    const [firstSetupId, setFirstSetupId] = useState(null);

    useEffect(() => {
        const fetchFirstSetup = async () => {
            try {
                const res = await getAllBikeSetupsService();
                if (res.length > 0) {
                    setFirstSetupId(res[0]._id);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchFirstSetup();
    }, []);

    return (
        <div className="headerContainerStyle">
            <div className="headerLogoContainer">
                <Link to="/companion/dashboard">
                    <img className="LogoHeaderStyle" src={logoSimple} alt="logo with text" />
                </Link>
            </div>
            <div className="userInfoStyle">
                <h2>Username: </h2>
                <h3>Weight: </h3>
                <h3>Height: </h3>
                <h3>Skill Level: </h3>
            </div>
            <nav className="navContainerStyle">
                <Link to={"/companion/dashboard"} className="homeNavLinkStyle">Home</Link>
                <Link to={"/companion/create"} className="createNavLinkStyle">Create Setup</Link>
                {firstSetupId ? (
                    <Link to={`/companion/manage/${firstSetupId}`} className="manageNavLinkStyle">Manage Setups</Link>
                ) : (
                    <span className="disabledNavLinkStyle">Manage Setups</span>
                )}
                <Link to={"/companion/knowhow"} className="knowHowNavLinkStyle">Know-How</Link>
            </nav>
        </div>
    );
}

export default Header;
