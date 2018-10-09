import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form, Transition, Input, Label } from 'semantic-ui-react';
import Cropper from 'react-cropper';

import './styles.css';

// Reducers
import { handleModal } from '../../../reducers/modals';
import { handleProductInputs, updateProduct, handleProductLoader } from '../../../reducers/products';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      handleProductLoader,
      updateProduct,
      handleModal,
      handleProductInputs,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class ProductModalEdit extends Component {
  state = {
    isCropped : 0,
  };
  render() {
    const { editProductModal } = this.props.reducers.modals;
    const { edit : { name, description, picture, price, quantity }, loader } = this.props.reducers.products;
    return (
      <div className='ProductModal'>
        <Transition animation='fade up' duration={ 600 } visible={ editProductModal }>
          <Modal
            closeIcon
            open={ editProductModal }
            onClose={ this.closeModal }>
            <Modal.Header>
              Editar producto
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
                <Form.Field>
                  <label>Cantidad</label>
                  <Input { ...{
                    disabled    : loader,
                    placeholder : 'Cantidad',
                    name        : 'quantity',
                    value       : quantity,
                    onChange    : this.handleChange,
                    labelPosition : 'right',
                    type          : 'number',
                  } }>
                    <Label basic>Uni</Label>
                  <input />
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
    this.props.actions.handleProductInputs('edit', 'picture', url);
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
    this.props.actions.handleModal('editProductModal');
  };

  handleSubmit = () => {
    this.setState({
      isCropped : 0,
    });
    this.props.actions.handleProductLoader();
    if (this.state.isCropped > 1) {
      this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
        this.props.actions.updateProduct(blob);
      });
    } else {
      this.props.actions.updateProduct();
    }
  };

  handleChange = (e, { name, value }) => {
    this.props.actions.handleProductInputs('edit', name, value);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModalEdit)
