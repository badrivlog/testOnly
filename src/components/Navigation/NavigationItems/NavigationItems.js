import React from 'react';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import HomeIcon from '@material-ui/icons/Home';

const navigationItems = (props) => (
        <ul className={classes.NavigationItems} onClick={props.clicked}>
            <NavigationItem link='/' exact> <HomeIcon /> </NavigationItem>
            {props.authenticate ? <NavigationItem link='/orders'> <ShoppingBasketIcon /> </NavigationItem>: null}
            {!props.authenticate
            ? <NavigationItem link="auth">Sign up</NavigationItem>
            : <NavigationItem link="logout">Logout</NavigationItem>}
        </ul>

);

export default navigationItems;