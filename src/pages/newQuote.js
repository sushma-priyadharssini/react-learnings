import QuoteForm from '../components/quotes/QuoteForm';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
    const { sendRequest, status } = useHttp(addQuote);
    const history = useHistory();
    useEffect(() => {
        if(status === 'completed') {
            history.push('/quotes');
        }
    }, [status, history])
    const addQuoteHandler = (data) => {
        sendRequest(data);
    }
    return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}>
    </QuoteForm>
    )
}

export default NewQuote;