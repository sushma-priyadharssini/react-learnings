import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
// import NewQuote from './pages/newQuote';
// import PageNotFound from './pages/pageNotFound';
// import QuotesDetail from './pages/quotesDetail';
import QuotesList from './pages/quotesList';

const NewQuote = React.lazy(() => import('./pages/newQuote'));
const PageNotFound = React.lazy(() => import('./pages/pageNotFound'));
const QuotesDetail = React.lazy(() => import('./pages/quotesDetail'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className='centered'><LoadingSpinner /></div>}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <QuotesList />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuotesDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
