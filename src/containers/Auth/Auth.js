import React, { Component } from 'react';
import Input from '../../components/UI/Form/Input/Input';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

class Auth extends Component {
    state = { 
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
     };


     componentDidMount(){
        if(!this.props.burgerBuilding && this.props.authRedirectPath !== '/' ){
            this.props.onAuthRedirectPath();
        }
    };


    inputChangeHandler(event, controlName) {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.ckeckValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        } 
        this.setState({controls: updatedControls});
     }

     ckeckValidity(value, rules) {
        let isValid = true;
        if (!rules){
            return true
        }
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuthenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    authSwitchHandler = () => {
        this.setState(prevState =>{
            return {isSignUp: !prevState.isSignUp}
        })
    };

    render() { 
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };
        let form = (formElementsArray.map(formElement => {
            return(
                <Input 
                key={formElement.id}
                elementconfig={formElement.config.elementConfig}
                elementtype={formElement.config.elementType}
                value={formElement.value}
                invalid={!formElement.config.valid}
                inputTouched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                changed={(event)=>this.inputChangeHandler(event, formElement.id)} />
            )
        }));

        // let signInMode = '';
        // if(this.props.isSignUp){
        //     signInMode = 'SIGNIN';
        // }else {
        //     signInMode = "SIGNUP";
        // }

        
        let redirect = null;
        if(this.props.isAuthenticate)
            redirect = <Redirect to={this.props.authRedirectPath} />


        return ( 
            <div className={classes.AuthLayout}>
            <div className={classes.Auth}>
                <div className={classes.UserIcon}>
                    <PersonOutlineIcon style={{fontSize: '44px'}} />
                </div>
                {redirect}
                {this.state.isSignUp ? <h2>Create an account</h2>: <h2>Sign In</h2>}
                {this.props.error ? <p style={{color: 'red'}}>{this.props.error.message}</p>: null}
                { this.props.auth ? <Spinner /> :
                    <form onSubmit={this.submitHandler}>
                    {form}
                    <button className={classes.SubmitButton}>
                        {
                            this.state.isSignUp ? "SIGN UP" : 'LOGIN'
                        }
                    </button>
                </form>}
                <Button 
                    clicked={this.authSwitchHandler}
                btnType='Danger'>Switch to {this.state.isSignUp ? <span className={classes.SignUp}>Sign In</span> : <span className={classes.SignUp}>Sign Up</span>}</Button>
            </div>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.loading,
        isAuthenticate: state.auth.idToken !== null,
        burgerBuilding: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuthenticate: (email, password, signUpMethod)=> dispatch(actions.auth(email, password, signUpMethod)),
        onAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps) (Auth);