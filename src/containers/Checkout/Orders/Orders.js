import React, {Component} from 'react';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-order';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount(){
        this.props.onOrderFetched(this.props.token, this.props.userId);
    };
    render() {

        let order = (<div>
            {this.props.order ?<h2>Your Orders</h2>: <h2>You have No orders!</h2>}
            {this.props.order.map(val => {
                return <Order key={val.id}
                ingredients={val.ingredients}
                price={+val.price} />
            })}
            </div>);
            if (this.props.loading) {
                return <Spinner />
            };

        return order
    }
};

const mapStateToProps = state => {
    return {
        order: state.orders.order,
        loading: state.orders.loading,
        token: state.auth.idToken,
        userId: state.auth.localId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderFetched: (token, userId) => dispatch(actions.orderFetch(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Orders);