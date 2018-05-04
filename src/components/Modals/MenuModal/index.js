import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form, Transition } from 'semantic-ui-react';
import Cropper from 'react-cropper';

import './styles.css';

// Reducers
import { handleModal } from '../../../reducers/modals';
import { handleMenuInputs, createMenu, handleMenuLoader } from '../../../reducers/menus';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      handleMenuLoader,
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
    const { create : { name, description, picture }, loader } = this.props.reducers.menus;
    console.log(this.state);
    return (
      <div className='MenuModal'>
        <Transition animation='fade up' duration={ 600 } visible={ createMenuModal }>
          <Modal
            closeIcon
            open={ createMenuModal }
            onClose={ this.closeModal }>
            <Modal.Header>
              Crear Menu Nuevo
            </Modal.Header>
            <Modal.Content>
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
                <Form.Input>
                <span>
                  <label htmlFor='fileUploader' className='ui icon button'>
                    <i className='upload icon'/>
                    Subir Foto
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

                <div style={ { width : 500, height : 300 } }>
                  <Cropper { ...{
                    ref         : 'cropper',
                    src         : picture,
                    style       : { height : 300, width : '100%' },
                    aspectRatio : 16 / 9,
                    guides      : false,
                  } } />
                </div>

                <div style={ { marginTop : 20, width : 200 } }>
                  <Form.Button content='Crear' positive fluid loading={ loader } disabled={loader}/>
                </div>
              </Form>
            </Modal.Content>
          </Modal>
        </Transition>
      </div>
    );
  }

  loadEditView = (url) => {
    this.props.actions.handleMenuInputs('create', 'picture', url);
  };

  handleSelectImage = () => {
    const file = this.input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.loadEditView(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  closeModal = () => {
    this.props.actions.handleModal('createMenuModal');
  };

  handleSubmit = () => {
    this.props.actions.handleMenuLoader();
    this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
      this.props.actions.createMenu(blob);
    });
  };

  handleChange = (e, { name, value }) => {
    this.props.actions.handleMenuInputs('create', name, value);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuModal)
