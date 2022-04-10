import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const navigate = useNavigate();

    const signUp = () => {
        navigate("/users/register");
        window.location.reload();
    };

    const logIn = () => {
        navigate("/users/login");
        window.location.reload();
    };

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
        window.location.reload();
    }

    return (
        <nav className='navbar' role='navigation' aria-label="main navigation">
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <a className="button is-primary" onClick={signUp}>
                            <strong>Sign up</strong>
                        </a>
                        {isLoggedIn 
                            ? <a className="button is-light" onClick={logOut}>Log out</a> 
                            : <a className="button is-light" onClick={logIn}>Log in</a>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HeaderComponent;