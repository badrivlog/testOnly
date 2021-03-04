import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const addIndredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://badri-firegram.firebaseio.com/ingredients.json')
        .then(response => {
            console.log(response.data)
            dispatch(setIngredient(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientFail(error));
        })
    };
};



export const fetchIngredientFail = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAIL,
    };
};