import logoWithText from '../assets/logoWithText.png';
import { useState } from 'react';
import { createUserService, loginUserService } from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const LoginAndRegistrationForm = () => {
    const navigate = useNavigate();

    const [registrationErrors, setRegistrationErrors] = useState({});
    const [loginErrors, setLoginErrors] = useState({});

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        weight: '',
        heightFeet: 0,
        heightInches: 0,
        skillLevel: '',
    });

    const updateUserData = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const createUser = async (e) => {
        e.preventDefault();
        try {
            await createUserService(userData);
            setUserData({
                username: '',
                password: '',
                confirmPassword: '',
                weight: '',
                heightFeet: 0,
                heightInches: 0,
                skillLevel: ''
            });
            navigate("/companion/dashboard");
        } catch (error) {
            if (error.response && error.response.data) {
                setRegistrationErrors(error.response.data.errors);
            } else {
                console.error("Error:", error);
            }
        }
    };


    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const updateLoginData = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const loginUser = async (e) => {
    e.preventDefault();
    try {
        await loginUserService({ username: loginData.username, password: loginData.password });
        navigate("/companion/dashboard");
    } catch (error) {
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.errors?.message || 'An unexpected error occurred.';
            
            setLoginErrors({
                username: errorMessage, 
                password: errorMessage  
            });
        } else {
            console.error("Error:", error);
        }
    }
};

    return (
        <div className="authContainer">
            <img className="LogoAuthStyle" src={logoWithText} alt="logo with text" />
            <div className="formContainer">
                <form onSubmit={createUser} className="registrationFormStyle">
                    <h2>Registration</h2>
                    {registrationErrors.username && <p className="errorStyle">{registrationErrors.username.message}</p>}
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={updateUserData}
                        />
                    </label>
                    {registrationErrors.password && <p className="errorStyle">{registrationErrors.password.message}</p>}
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={updateUserData}
                        />
                    </label>
                    {registrationErrors.confirmPassword && <p className="errorStyle">{registrationErrors.confirmPassword.message}</p>}
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={updateUserData}
                        />
                    </label>
                    {registrationErrors.weight && <p className="errorStyle">{registrationErrors.weight.message}</p>}
                    <label>
                        Weight (lbs):
                        <input
                            type="number"
                            name="weight"
                            value={userData.weight}
                            onChange={updateUserData}
                            min="0"
                            max="500"
                            step="1"
                        />
                    </label>
                    {registrationErrors.heightFeet && <p className="errorStyle">{registrationErrors.heightFeet.message}</p>}
                    <label>
                        Height (ft | in):
                        <select
                            name="heightFeet"
                            value={userData.heightFeet}
                            onChange={updateUserData}
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                        <select
                            name="heightInches"
                            value={userData.heightInches}
                            onChange={updateUserData}
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                        </select>
                    </label>
                    {registrationErrors.skillLevel && <p className="errorStyle">{registrationErrors.skillLevel.message}</p>}
                    <label>
                        Skill Level:
                        <select
                            name="skillLevel"
                            value={userData.skillLevel}
                            onChange={updateUserData}
                        >
                            <option value="">Select skill level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Pro">Pro</option>
                        </select>
                    </label>
                    <div>
                        <input
                            type="submit"
                            value="Complete"
                        />
                    </div>
                </form>
                <form onSubmit={loginUser} className="loginFormStyle">

                    {/* -- LOGIN FORM -- */}
                    <h2>Login</h2>
                    {loginErrors.username && <p className="errorStyle">{loginErrors.message}</p>}
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={loginData.username}
                            onChange={updateLoginData}
                        />
                    </label>
                    {loginErrors.password && <p className="errorStyle">{loginErrors.message}</p>}
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={updateLoginData}
                        />
                    </label>
                    <div>
                        <input
                            type="submit"
                            value="Login"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginAndRegistrationForm;
