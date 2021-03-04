import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = (props)=> {
    return (
        <div className={classes.BuildControls}>
            <p>Currant Price: <strong>{props.price.toFixed(2)} $</strong> </p>
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.label}
                added={()=> props.ingredientAdded(ctrl.type)}
                remove={()=> props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
            ) )}
            <button className={classes.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.ordered}>{props.isAuth ? "ORDER NOW": "SIGNUP TO ORDER" }</button>
        </div>
    )
}

export default BuildControls;
