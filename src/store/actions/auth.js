import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, localId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId,
    }
};

export const authFail = erorr => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: erorr
    }
};

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expiryTime) =>{
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiryTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    console.log(email, password);
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1ajgKrOQJb_sswhR10lrliW3S4AI1IQQ';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1ajgKrOQJb_sswhR10lrliW3S4AI1IQQ';
        };
        axios.post(url, authData)
        .then(response =>{
            console.log(response);
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })
    }
};

export const checkAuthState = ()=> {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if(expirationTime <= new Date()){
                dispatch(logout());
            }else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expirationTime.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};