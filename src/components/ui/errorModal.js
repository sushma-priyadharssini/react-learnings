import classes from './errorModal.module.css';
import Card from './card';
import Button from './button';
import { Fragment } from 'react';
import { createPortal } from 'react-dom';

const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onOkay} />
    )
}

const Modal = (props) => {
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.errorTitle}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.errorMessage}</p>
            </div>
            <footer className={classes.actions}>
                <Button onClick={props.onOkay}>OK</Button>
            </footer>
        </Card>
    )
}

const ErrorModal = (props) => {
    return (
        <Fragment>
            {createPortal(
                <Backdrop onOkay={props.onOkay}/>,
                document.getElementById('backdrop-root')
            )}
            {createPortal(
                <Modal 
                    onOkay={props.onOkay}
                    errorTitle={props.errorTitle} 
                    errorMessage={props.errorMessage}/>,
                document.getElementById('overlay-root')
            )}
        </Fragment>
    );
}

export default ErrorModal;