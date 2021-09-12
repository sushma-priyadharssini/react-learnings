import Counter from './components/Counter';
import Header from './components/Header';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';
import { Fragment } from 'react';
import { useSelector } from 'react-redux'

function App() {
  const isAuthenticated = useSelector(state => state.auth.isLoggedIn);
  return (
    <Fragment>
      <Header />
      { !isAuthenticated && <Auth /> }
      { isAuthenticated && <UserProfile /> }
      <Counter />
    </Fragment>
  );
}

export default App;
