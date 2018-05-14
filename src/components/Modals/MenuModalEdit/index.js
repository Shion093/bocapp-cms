import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form, Transition } from 'semantic-ui-react';
import Cropper from 'react-cropper';

import './styles.css';

// Reducers
import { handleModal } from '../../../reducers/modals';
import { handleMenuInputs, updateMenu, handleMenuLoader } from '../../../reducers/menus';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      handleMenuLoader,
      updateMenu,
      handleModal,
      handleMenuInputs,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class MenuModalEdit extends Component {
  state = {
    isCropped : 0,
  };
  render() {
    const { editMenuModal } = this.props.reducers.modals;
    const { edit : { name, description, picture }, loader } = this.props.reducers.menus;
    console.log(this.state);
    return (
      <div className='MenuModal'>
        <Transition animation='fade up' duration={ 600 } visible={ editMenuModal }>
          <Modal
            closeIcon
            open={ editMenuModal }
            onClose={ this.closeModal }>
            <Modal.Header>
              Editar menu
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
                    crop        : this.croppedImage
                  } } />
                </div>

                <div style={ { marginTop : 20, width : 200 } }>
                  <Form.Button content='Editar' positive fluid loading={ loader } disabled={loader}/>
                </div>
              </Form>
            </Modal.Content>
          </Modal>
        </Transition>
      </div>
    );
  }

  croppedImage = () => {
    this.setState({
      isCropped : this.state.isCropped + 1,
    })
  };

  loadEditView = (url) => {
    this.props.actions.handleMenuInputs('edit', 'picture', url);
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
    this.setState({
      isCropped : 0,
    });
    this.props.actions.handleModal('editMenuModal');
  };

  handleSubmit = () => {
    this.setState({
      isCropped : 0,
    });
    this.props.actions.handleMenuLoader();
    if (this.state.isCropped > 1) {
      this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
        this.props.actions.updateMenu(blob);
      });
    } else {
      this.props.actions.updateMenu();
    }
  };

  handleChange = (e, { name, value }) => {
    this.props.actions.handleMenuInputs('edit', name, value);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuModalEdit)
