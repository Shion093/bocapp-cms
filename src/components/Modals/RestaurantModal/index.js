import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form, Transition, Label } from 'semantic-ui-react';

import './styles.css';

// Reducers
import { handleModal } from '../../../reducers/modals';
import { createRestaurant, handleRestaurantInputs } from '../../../reducers/restaurants';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      handleModal,
      handleRestaurantInputs,
      createRestaurant,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class RestaurantModal extends Component {
  render() {
    const { restaurantModal } = this.props.reducers.modals;
    const { create : { name, description, url, email }, loader } = this.props.reducers.restaurants;
    return (
      <Transition animation='fade up' duration={ 600 } visible={ restaurantModal }>
        <Modal
          closeIcon
          open={ restaurantModal }
          onClose={ this.closeModal }>
          <Modal.Header>
            Crear Restaurante
          </Modal.Header>
          <Modal.Content>
            <div className="RestaurantModal">
              <Form onSubmit={ this.handleSubmit } loading={loader}>
                <Form.Input { ...{
                  disabled    : loader,
                  placeholder : 'Nombre',
                  label       : 'Nombre',
                  name        : 'name',
                  value       : name,
                  onChange    : this.handleChange,
                } }  />
                <Form.Input { ...{
                  disabled    : loader,
                  placeholder : 'Descripcion',
                  label       : 'Descripcion',
                  name        : 'description',
                  value       : description,
                  onChange    : this.handleChange,
                } }  />
                <Form.Input { ...{
                  disabled    : loader,
                  placeholder : 'Email Propietario',
                  label       : 'Email Propietario',
                  name        : 'email',
                  type        : 'email',
                  value       : email,
                  onChange    : this.handleChange,
                } }  />
                <div className='web-input'>
                  <Form.Input { ...{
                    labelPosition : 'right',
                    label         : 'Direccion Web',
                    type          : 'text',
                    name          : 'url',
                    value         : url,
                    onChange      : this.handleChange,
                  } }>
                    <Label basic>https://</Label>
                    <input/>
                    <Label>.bocaapp.com</Label>
                  </Form.Input>
                </div>
                <div style={ { marginTop : 20, width : 200 } }>
                  <Form.Button content='Crear' positive fluid loading={ loader } disabled={ loader }/>
                </div>
              </Form>
            </div>
          </Modal.Content>
        </Modal>
      </Transition>
    );
  }

  closeModal = () => {
    this.props.actions.handleModal('restaurantModal');
  };

  handleSubmit = () => {
    this.props.actions.createRestaurant();
  };

  handleChange = (e, { name, value }) => {
    this.props.actions.handleRestaurantInputs('create', name, value);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantModal)
