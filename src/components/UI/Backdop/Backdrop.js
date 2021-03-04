import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => {
    const atachClasses = [classes.Backdrop, props.show ? classes.BackdropOpen : classes.BackdropClose]
    return(
    props.show ? <div className={atachClasses.join(' ')} onClick={props.clicked}></div> : null
    )
};

export default backdrop;