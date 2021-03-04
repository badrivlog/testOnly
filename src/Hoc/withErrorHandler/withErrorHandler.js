import React, {Component} from 'react';
import Aux from '../Auxe';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (wrapComponent)=> {
    return class extends Component {

        render(){
            return (
                <Aux>
                <Modal show>
                    something did not work!
                </Modal>
            <wrapComponent {...this.props} />
            </Aux>)
        }

    }
}

export default withErrorHandler;