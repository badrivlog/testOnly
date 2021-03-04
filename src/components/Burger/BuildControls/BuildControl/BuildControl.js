import React from 'react';

import classes from "./BuildControl.css";
import AddBoxIcon from '@material-ui/icons/AddBox';

const buildControl =(props)=> {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less}
             onClick={props.remove}
            disabled={props.disabled} >Less</button>
            <button onClick={props.added} className={classes.More}>More</button>
        </div>
    )
}

export default buildControl;
