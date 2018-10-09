import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form, Input, Transition, Label, Grid } from 'semantic-ui-react';
import Cropper from 'react-cropper';

import './styles.css';

// Reducers
import { handleModal } from '../../../reducers/modals';
import { handleProductInputs, handleProductLoader, createProduct } from '../../../reducers/products';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      handleProductLoader,
      createProduct,
      handleModal,
      handleProductInputs,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class ProductModal extends Component {
  render() {
    const { createProductModal } = this.props.reducers.modals;
    const { create : { name, description, picture, price }, loader } = this.props.reducers.products;
    return (
      <div className='ProductModal'>
        <Transition animation='fade up' duration={ 600 } visible={ createProductModal }>
          <Modal
            closeIcon
            open={ createProductModal }
            onClose={ this.closeModal }>
            <Modal.Header>
              Crear nuevo producto
            </Modal.Header>
            <Modal.Content>
            <Form onSubmit={ this.handleSubmit } loading={loader}>
              <Grid columns={1} className='grid-scroll'>
                  <Grid.Row className='inner-scroll'>
                    <Grid.Column>
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
                    </Grid.Column>
                    <Grid.Column>
                      <Grid columns={1} className='grid-scroll'>
                        <Grid.Row columns={2} className='inner-scroll'>
                          <Grid.Column>
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
                          </Grid.Column>
                          {
                            // <Grid.Column>
                            //   <Form.Field>
                            //     <label>Cantidad</label>
                            //     <Input { ...{
                            //       disabled    : loader,
                            //       placeholder : 'Cantidad',
                            //       name        : 'quantity',
                            //       value       : quantity,
                            //       onChange    : this.handleChange,
                            //       labelPosition : 'right',
                            //       type          : 'number',
                            //     } }>
                            //       <Label basic>Uni</Label>
                            //       <input />
                            //       <Label>.00</Label>
                            //     </Input>
                            //   </Form.Field>
                            // </Grid.Column>
                          }
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                    <Grid.Column>
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
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>

            </Modal.Content>
          </Modal>
        </Transition>
      </div>
    );
  }

  loadEditView = (url) => {
    this.props.actions.handleProductInputs('create', 'picture', url);
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
    this.props.actions.handleModal('createProductModal');
  };

  handleSubmit = () => {
    this.props.actions.handleProductLoader();
    this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
      this.props.actions.createProduct(blob);
    });
  };

  handleChange = (e, { name, value }) => {
    this.props.actions.handleProductInputs('create', name, value);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal)
