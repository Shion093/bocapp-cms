import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Button, Grid, Icon, Item, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';
import fuzzyFilterFactory from 'react-fuzzy-filter';

import './styles.css';

// Components
import ProductModal from '../../components/Modals/ProductModal';
import ProductModalEdit from '../../components/Modals/ProductModalEdit';

// Reducers
import { getAllMenus } from '../../reducers/menus';
import { getAllProducts, handleMenuChange, assignProduct, removeProduct } from '../../reducers/products';
import { handleModal } from '../../reducers/modals';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      changePage: () => push('/'),
      getAllMenus,
      handleModal,
      getAllProducts,
      assignProduct,
      removeProduct,
      handleMenuChange,
    }, dispatch),
  };
}

class Products extends Component {

  componentWillMount () {
    this.props.actions.getAllMenus();
    this.props.actions.getAllProducts();
  }

  getOptions = () => {
    const { menus } = this.props.reducers.menus;
    return _.map(menus, ({ _id, name }) => ({key : _id, value : _id, text : name}));
  };

  openModal = (modal, data) => () => {
    this.props.actions.handleModal(modal, data, 'product');
  };

  dropDownChange = (e, { value }) => {
    this.props.actions.handleMenuChange(value);
  };

  handleProductAssign = (id) => () => {
    this.props.actions.assignProduct(id);
  };

  handleProductRemove = (id) => () => {
    this.props.actions.removeProduct(id);
  };

  render () {
    const { products : { products, selectedMenu } } = this.props.reducers;
    const { InputFilter, FilterResults } = fuzzyFilterFactory();
    const fuseConfig = {
      keys: ['name', 'description', 'price', 'quantity'],
      threshold: 0.3,
    };
    return (
      <div className='Products'>
        <ProductModal/>
        <ProductModalEdit/>
        <Grid columns={2} doubling className='dropDownMenus' padded>
          <Grid.Row>
            <Grid.Column floated='left' width={6}>
              <InputFilter debounceTime={ 200 } className="input-filter" inputProps={ { placeholder: "Buscar producto..." } } />
              <Button positive onClick={this.openModal('createProductModal')}>Nuevo</Button>
            </Grid.Column>
            <Grid.Column>
              <Dropdown { ...{
                onChange    : this.dropDownChange,
                options     : this.getOptions(),
                placeholder : 'Seleccione categoría',
                fluid       : true,
                search      : true,
                selection   : true,
                value       : selectedMenu._id || '',
              } }  />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={2} doubling>
          <Grid.Row>
            <Grid.Column className='column-scroll'>
              <FilterResults { ...{
                fuseConfig,
                items: products,
              } }>
                {
                (filteredProducts) => {
                  if (filteredProducts.length === 0) {
                    return (
                      <h3 className="no-found">No se encontraron productos</h3>
                    );
                  }
                  return (
                    <Item.Group divided className='available'>
                      {
                        _.map(filteredProducts, (product) => {
                          const { _id, name, picture, description, price } = product;
                          return (
                            <Item className='product-item' key={_id}>
                              <Item.Image src={picture} />
                              <Item.Content floated='left'>
                                <Item.Header>{name}</Item.Header>
                                <Item.Meta>
                                  <span className='cinema'>Precio: ₡{price}</span>
                                </Item.Meta>
                                <Item.Description>{description}</Item.Description>
                                <Item.Extra>
                                  <Button primary animated='vertical' onClick={this.openModal('editProductModal', product)}>
                                    <Button.Content hidden>Editar</Button.Content>
                                    <Button.Content visible>
                                      <Icon name='edit' />
                                    </Button.Content>
                                  </Button>
                                  <Button primary floated='right' animated onClick={this.handleProductAssign(_id)}>
                                    <Button.Content visible>Añadir</Button.Content>
                                    <Button.Content hidden>
                                      <Icon name='arrow right' />
                                    </Button.Content>
                                  </Button>
                                </Item.Extra>
                              </Item.Content>
                            </Item>
                          )
                        })
                      }
                    </Item.Group>
                  );}
                }
              </FilterResults>
            </Grid.Column>
            <Grid.Column className='column-scroll'>
              <Item.Group divided className='available'>
                {
                  _.map(selectedMenu.products, (product) => {
                    const { _id, name, picture, description, price, quantity } = product;
                    return (
                      <Item className='product-item' key={_id}>
                        <Item.Image src={picture} />
                        <Item.Content floated='left'>
                          <Item.Header>{name}</Item.Header>
                          <Item.Meta>
                            <span className='cinema'>Precio: ₡{price}</span>
                          </Item.Meta>
                          <Item.Meta>
                            <span className='cinema'>Cantidad:  ₡{quantity}</span>
                          </Item.Meta>
                          <Item.Description>{description}</Item.Description>
                          <Item.Extra>
                            
                            <Button color='red' floated='left' animated onClick={this.handleProductRemove(_id)}>
                              <Button.Content visible>Remover</Button.Content>
                              <Button.Content hidden>
                                <Icon name='arrow left' />
                              </Button.Content>
                            </Button>
                            <Button primary animated='vertical' floated='right' onClick={this.openModal('editProductModal', product)}>
                              <Button.Content hidden>Editar</Button.Content>
                              <Button.Content visible>
                                <Icon name='edit' />
                              </Button.Content>
                            </Button>
                          </Item.Extra>
                        </Item.Content>
                      </Item>
                    )
                  })
                }
              </Item.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
