import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

// 2 ways of consuming context

const Navigation = (props) => {
  const ctx = useContext(AuthContext);
  return (
    // <AuthContext.Consumer>
    //   {(ctx) => {
    //      <nav className={classes.nav}>
    //       <ul>
    //         {ctx.isLoggedIn && (
    //           <li>
    //             <a href="/">Users</a>
    //           </li>
    //         )}
    //         {props.isLoggedIn && (
    //           <li>
    //             <a href="/">Admin</a>
    //           </li>
    //         )}
    //         {props.isLoggedIn && (
    //           <li>
    //             <button onClick={props.onLogout}>Logout</button>
    //           </li>
    //         )}
    //       </ul>
    //     </nav>
    //   }}
    // </AuthContext.Consumer>
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button
              // onClick={props.onLogout}
              onClick={ctx.onLogout}
              >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
   );
};

export default Navigation;
