import { Fragment, useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from '../lib/api';

const DUMMY_QUOTES = [
    {id: 'q1', author: 'Me', text: 'Learning React is fun!'},
    {id: 'q2', author: 'You', text: 'Learning React is woohooo!'}
]

const QuotesDetail = () => {
    const params = useParams();
    const match = useRouteMatch();
    const { sendRequest, status, data: quote, error } = useHttp(getSingleQuote, true);
    useEffect(() => {
        sendRequest(params.quoteId);
    }, [sendRequest, params.quoteId]);
    // const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

    if(status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        )
    }

    if (error) {
        return <p className='centered focused'>{error}</p>
    }

    if(status === 'completed' && !quote) {
        return <p>No Quote found!</p>
    }

    return (
        <Fragment>
            <HighlightedQuote text={quote.text} author={quote.author}/>
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    )
}

export default QuotesDetail;