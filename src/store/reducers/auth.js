import * as actionTypes from '../actions/actionsTypes';
import {updatedObject} from '../utility';

const initialState = {
    idToken: null,
    localId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
}

const authStart = (state, action) => {
    return updatedObject(state, {loading: true})
};

const authSucces = (state, action) =>{
    return updatedObject(state, {
        idToken: action.idToken,
        localId: action.localId,
        loading: false
    })
};

const authFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false
    })
};
const authLogout = (state, action)=>{
    return updatedObject(state, {idToken: null, localId: null});
}

const setAuthRedirect = (state, action)=>{
    return updatedObject(state, {authRedirectPath: action.path})
};

 const reducer = (state = initialState, action)=>{

    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSucces(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirect(state, action);
        default: return state;
    }

};

export default reducer;