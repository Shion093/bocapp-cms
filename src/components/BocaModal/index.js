import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form, Input, Transition, Label } from 'semantic-ui-react';
import Cropper from 'react-cropper';

import './styles.css';
import 'cropperjs/dist/cropper.css';

// Reducers
import { handleModal } from '../../reducers/modals';
import { handleBocaInputs, handleBocaLoader, createBoca } from '../../reducers/bocas';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      handleBocaLoader,
      createBoca,
      handleModal,
      handleBocaInputs,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class BocaModal extends Component {
  render() {
    const { createBocaModal } = this.props.reducers.modals;
    const { edit : { name, description, picture, price }, loader } = this.props.reducers.bocas;
    return (
      <div className='BocaModal'>
        <Transition animation='fade up' duration={ 600 } visible={ createBocaModal }>
          <Modal
            closeIcon
            open={ createBocaModal }
            onClose={ this.closeModal }>
            <Modal.Header>
              Crear Boca Nueva
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
                <Form.TextArea { ...{
                  disabled    : loader,
                  placeholder : 'Descripcion',
                  label       : 'Descripcion',
                  name        : 'description',
                  value       : description,
                  onChange    : this.handleChange,
                } }  />

                <Form.Field>
                  <label>Precio</label>
                  <Input { ...{
                    disabled    : loader,
                    placeholder : 'Precio',
                    name        : 'price',
                    value       : price,
                    onChange    : this.handleChange,
                    labelPosition : 'right',
                    type          : 'number',
                  } }>
                    <Label basic>₡</Label>
                    <input />
                    <Label>.00</Label>
                  </Input>
                </Form.Field>

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
    this.props.actions.handleBocaInputs('create', 'picture', url);
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
    this.props.actions.handleModal('createBocaModal');
  };

  handleSubmit = () => {
    this.props.actions.handleBocaLoader();
    this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
      this.props.actions.createBoca(blob);
    });
  };

  handleChange = (e, { name, value }) => {
    this.props.actions.handleBocaInputs('create', name, value);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BocaModal)
