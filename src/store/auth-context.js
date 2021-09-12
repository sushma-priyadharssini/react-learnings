import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({ // can be a string/Number/Boolean also, we'll need object in most of the cases
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export  const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === '1') {
        setIsLoggedIn(true);
    }
    }, []);
    
    const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
    };

    const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    };
    
    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;