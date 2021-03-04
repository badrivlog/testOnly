import * as actionTypes from '../actions/actionsTypes';
import {updatedObject} from '../utility';

const initialState = {
    order: [],
    loading: false,
    purchased: false
};

const purchaseBurgerStart = (state, action) => {
    return updatedObject(state, {loading: true})
};

const purchaseBurgerSuccess = (state, action)=> {
    const newOrder = {
        ...action.orderData,
        id: action.orderId,
    }
    return {
        ...state,
        loading: false,
        purchased: true,
        order: state.order.concat(newOrder)
    }
};

const fetchOrderStart = state => {
    return updatedObject(state, {loading: true})
};
const fetchOrderSuccess = (state, action) => updatedObject(state, {loading: false, order: action.order})
const fetchOrderFail = (state, action) => updatedObject(state, {loading: false, });
const purchaseBurgerFail = state => updatedObject(state, {loading: false});
const initPurchase = (state, action) => updatedObject(state, {purchased: false});
 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.FETCH_ORDER_START: return fetchOrderStart(state);
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action); 
        case actionTypes.FETCH_ORDER_FAIL: return fetchOrderFail(state, action);
        case actionTypes.INIT_PURCHASE: return initPurchase(state, action);
    };
    return state
}; 

export default reducer;