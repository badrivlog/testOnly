import React, { Component } from 'react';
import classes from './Modal.css';
import Auxe from '../../../Hoc/Auxe';
import Backdrop from '../Backdop/Backdrop';

    class Modal extends Component {

        shouldComponentUpdate(nextProps, nextState) {
           
                return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
        
        };

        componentDidUpdate() {
            console.log('[Modal] componentDidUpdate');
        };

        render() {

            let atatchClass = [classes.Modal, classes.ModalClose];
            if(this.props.show){
                atatchClass = [classes.Modal, classes.ModalOpen]
            }
            

            return(
                <Auxe>
                <Backdrop show={this.props.show}  clicked={this.props.modalClose}/>
                <div className={atatchClass.join(' ')}
            >
                {this.props.children}
            </div>
            </Auxe>
            )
        }
    } 
export default Modal;