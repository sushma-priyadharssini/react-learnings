import { Route, Switch, Redirect } from 'react-router-dom';
import MainHeader from './components/mainHeader';
import ProductDetails from './pages/productDetails';
import Products from './pages/products';
import Welcome from './pages/welcome';

function App() {
  return (
    <div>
      <MainHeader></MainHeader>
      <main>
        <Switch>
        <Route path="/" exact>
            <Redirect to="/welcome" />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/products/:productId">
            <ProductDetails />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
