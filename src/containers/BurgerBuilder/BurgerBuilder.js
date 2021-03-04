import React, {Component} from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import axios from '../../axios-order';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';

import Auxe from '../../Hoc/Auxe';
import Spinner from '../../components/UI/Spinner/Spinner';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        // console.log(this.props);
        this.props.onIngredientFetch();
        // axios.get('https://badri-firegram.firebaseio.com/ingredients.json')
        // .then(res => console.log(res.data))
        // .catch(err => console.log('nothing'))

    };



    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map( igKey =>{
                return ingredients[igKey];
            })
            .reduce((sum, el)=>{
                return sum + el;
            }, 0);
            return sum > 0;
    };

    // addIngredintHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const upadatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     upadatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: upadatedIngredients});
    //     this.updatePurchaseState(upadatedIngredients);
    // };

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0){
    //         return;
    //     };
    //     const updatedCount = oldCount - 1;
    //     const upadatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     upadatedIngredients[type] = updatedCount;
    //     const priceDeduvtion = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduvtion;
    //     this.setState({totalPrice: newPrice, ingredients: upadatedIngredients});
    //     this.updatePurchaseState(upadatedIngredients);
    // };

    purchaseHandler = () => {
        if(this.props.isAuthenticate){
            this.setState({purchasing: true});
        }else {
            this.props.onBurgerRedirect("/checkout")
            this.props.history.push("/auth")
        }
    };
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        //alert('You continue!');
        // const queryParms = [];
        // for (let i in this.props.ings) {
        //     queryParms.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParms.push('price=' + this.props.price);
        // const queryStrimg = queryParms.join('&');
        // this.props.history.push({
        //     pathname: './checkout',
        //     search: '?' + queryStrimg
        // });
        this.props.history.push('/checkout');
        this.props.onInitPurchase();

    };

    render () {

        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };
        let orderView =<OrderSummary
        purhaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        ingredients={this.props.ings}
        price={this.props.price} />;

        if (this.state.loading) {
            orderView = <Spinner />
        };
        let ingredientsLoad = <Spinner />
        if (this.props.ings)
            ingredientsLoad = 
                <Auxe>
                    {this.state.purchasing ? <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                        {orderView}
                    </Modal>: null }
                    <Burger ingredients={this.props.ings} />
                   <BuildControls
                   ingredientAdded={(type)=>this.props.onAddIngredient(type)}
                   ingredientRemoved={(id)=>this.props.onIngredientRemove(id)}
                   disabled={disabledInfo}
                   price={this.props.price}
                   purchaseable={this.updatePurchaseState(this.props.ings)}
                   ordered={this.purchaseHandler} 
                   isAuth={this.props.isAuthenticate}
                   />
                </Auxe>
                
        return ingredientsLoad;
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isAuthenticate: state.auth.idToken !== null
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (type) => dispatch (actions.addIndredient(type)),
        onIngredientRemove: (type) => dispatch(actions.removeIngredient(type)),
        onIngredientFetch: () => dispatch (actions.initIngredients()),
        onInitPurchase: ()=> dispatch(actions.initPurchase()),
        onBurgerRedirect: (path)=> dispatch(actions.setAuthRedirectPath(path))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)  (BurgerBuilder);