import * as actionTypes from './actionsTypes';
import axios from '../../axios-order';



export const purchaseBurgerStart = () =>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const orderBurgerStart = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then(res => {
            console.log(res);
            dispatch(orderBurgerSuccess(res.data.name, orderData));
        }).catch(err => {
            console.log(err)
            dispatch(orderBurgerFail(err));
        });
    };
};

export const orderBurgerSuccess = (id, orderData, userId) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
        userId: userId
    };
};

export const orderBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    };
};

export const orderFetch = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(res =>{
            const fetchOrder = [];
            for ( let key in res.data){
                fetchOrder.push({
                    ...res.data[key],
                    id: key
                });
            };
            dispatch(fetchOrderSuccess(fetchOrder));
        }).catch(err=>{
            dispatch(fetchOrderFail(err))
        })
    };
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        order: orders
    };
};

export const fetchOrderFail = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: err
    };
};

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    };
};