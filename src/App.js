import React, { useState, useEffect, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import { AuthContextProvider } from './store/auth-context';

function App() {
  // const hasLoggedIn = localStorage.getItem('isLoggedIn');
  let defaultValue = false;
  // if (hasLoggedIn === '1') {             // this works too
  //   defaultValue = true;
  // }
  const [isLoggedIn, setIsLoggedIn] = useState(defaultValue);

  /* THIS LEADS TO INFINITE LOOP
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === '1') {
      setIsLoggedIn(true);
    }
   */

  // Runs on first load of app, when state changes, app reloads, doesnt run this useEffect fn as it has no dependencies
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    // <React.Fragment> - No need since AuthContext becomes parent root that can be returned
    // Components and their child heirarchy wrapped inside context provider will have access to this context
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
      }}> 
        <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    // </React.Fragment>
  );

  // Can remove everything and use the custom context provider written
  // const ctx = useContext(AuthContext);
  // return (
  //   <AuthContextProvider>
  //     <MainHeader/>
  //     <main>
  //       {!ctx.isLoggedIn && <Login onLogin={ctx.onLogin}/>}
  //       {ctx.isLoggedIn && <Home onLogout={ctx.onLogout}/>}
  //     </main>
  //   </AuthContextProvider>
  // )
}

export default App;
