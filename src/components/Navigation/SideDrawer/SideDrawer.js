import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdop/Backdrop';
import Aux from '../../../Hoc/Auxe';

const sideDrawer = (props) => {

    let atachClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
      atachClasses = [classes.SideDrawer, classes.Open]
    };

    return (
        <Aux>
        <Backdrop show={props.show} clicked={props.close}/>
        <div className={atachClasses.join(' ')}>
            <Logo height='11%' margin='32px' />
            <nav>
                <NavigationItems clicked={props.close} authenticate={props.isAuth} />   
            </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;