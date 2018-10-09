import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form, Transition, Label } from 'semantic-ui-react';
import Cropper from 'react-cropper';

import './styles.css';

// Reducers
import { handleModal } from '../../../reducers/modals';
import { createStore, handleStoreInputs } from '../../../reducers/store';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      handleModal,
      handleStoreInputs,
      createStore,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class StoreModal extends Component {
  loadEditView = (url) => {
    this.props.actions.handleStoreInputs('create', 'logo', url);
  };
  handleSelectImage = () => {
    const file = this.input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.loadEditView(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  render() {
    const { storeModal } = this.props.reducers.modals;
    const { create : { name, description, domain, email, logo, banner }, loader } = this.props.reducers.store;
    return (
      <Transition animation='fade up' duration={ 600 } visible={ storeModal }>
        <Modal
          closeIcon
          open={ storeModal }
          onClose={ this.closeModal }>
          <Modal.Header>
            Crear tienda
          </Modal.Header>
          <Modal.Content>
            <div className="StoreModal">
              <Form onSubmit={ this.handleSubmit } loading={loader}>
                  <Form.Input>
                    <span>
                      <label htmlFor='fileUploader' className='ui icon button'>
                        <i className='upload icon'/>
                        Subir Icono
                      </label>
                      <input
                        disabled={loader}
                        type='file'
                        id='fileUploader'
                        style={ { display : 'none' } }
                        onChange={ this.handleSelectImage }
                        ref={ input => this.input = input }
                      />
                    </span>
                  </Form.Input>
  
                  <div style={ { width : 300, height : 300 } }>
                    <Cropper { ...{
                      ref         : 'icono',
                      src         : logo,
                      style       : { height : 300, width : '100%' },
                      aspectRatio : 16 / 9,
                      guides      : false,
                    } } />
                  </div>
                  {
                    // este name me parece que puede ser el nombre de la compañia,
                    // ya que la compañia se encarga de vender una cosa y nada mas, igual la description, pero por el momento puede quedar asi
                  }
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
                {
                  // aca podemos hacer un auto complete con los users que tenemos registrados
                }
                <Form.Input { ...{
                  disabled    : loader,
                  placeholder : 'Email Propietario',
                  label       : 'Email Propietario',
                  name        : 'email',
                  type        : 'email',
                  value       : email,
                  onChange    : this.handleChange,
                } }  />
                {
                  // esto quedaria para el domino de la compañia
                  // <div className='web-input'>
                  //   <Form.Input { ...{
                  //     labelPosition : 'right',
                  //     label         : 'Direccion Web',
                  //     type          : 'text',
                  //     name          : 'domain',
                  //     value         : domain,
                  //     onChange      : this.handleChange,
                  //   } }>
                  //     <Label basic>https://</Label>
                  //     <input/>
                  //     <Label>.bocaapp.com</Label>
                  //   </Form.Input>
                  // </div>
                }
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
    this.props.actions.handleModal('storeModal');
  };

  handleSubmit = () => {
    // this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
      this.props.actions.createStore();
    // });
  };

  handleChange = (e, { name, value }) => {
    this.props.actions.handleStoreInputs('create', name, value);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreModal)
