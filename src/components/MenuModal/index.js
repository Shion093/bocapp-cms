import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form } from 'semantic-ui-react';

import './styles.css';

// Reducers
import { handleModal } from '../../reducers/modals';
import { handleMenuInputs, createMenu } from '../../reducers/menus';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      createMenu,
      handleModal,
      handleMenuInputs,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class MenuModal extends Component {
  render() {
    const { createMenuModal } = this.props.reducers.modals;
    const { create : { name, description } } = this.props.reducers.menus;
    return (
      <div className="MenuModal">
        <Modal
          open={ createMenuModal }
          onClose={ this.closeModal }>
          <Modal.Header>
            Crear Menu Nuevo
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={ this.handleSubmit }>
              <Form.Input { ...{
                placeholder : 'Nombre',
                label       : 'Nombre',
                name        : 'name',
                value       : name,
                onChange    : this.handleChange,
              } }  />
              <Form.Input { ...{
                placeholder : 'Descripcion',
                label       : 'Descripcion',
                name        : 'description',
                value       : description,
                onChange    : this.handleChange,
              } }  />
              <Form.Button content='Crear'/>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }

  closeModal = () => {
    this.props.actions.handleModal('createMenuModal');
  };

  handleSubmit = () => {
    this.props.actions.createMenu();
  };

  handleChange = (e, { name, value }) => {
    this.props.actions.handleMenuInputs(name, value);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuModal)
