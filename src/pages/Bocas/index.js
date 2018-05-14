import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Button, Grid, Icon, Item, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';

import './styles.css';

// Components
import BocaModal from '../../components/Modals/BocaModal';
import BocaModalEdit from '../../components/Modals/BocaModalEdit';

// Reducers
import { getAllMenus } from '../../reducers/menus';
import { getAllBocas, handleMenuChange, assignBoca, removeBoca } from '../../reducers/bocas';
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
      getAllBocas,
      assignBoca,
      removeBoca,
      handleMenuChange,
    }, dispatch),
  };
}

class Bocas extends Component {

  componentWillMount () {
    this.props.actions.getAllMenus();
    this.props.actions.getAllBocas();
  }

  getOptions = () => {
    const { menus } = this.props.reducers.menus;
    return _.map(menus, ({ _id, name }) => ({key : _id, value : _id, text : name}));
  };

  openModal = (modal, data) => () => {
    this.props.actions.handleModal(modal, data, 'boca');
  };

  dropDownChange = (e, { value }) => {
    this.props.actions.handleMenuChange(value);
  };

  handleBocaAssign = (id) => () => {
    this.props.actions.assignBoca(id);
  };

  handleBocaRemove = (id) => () => {
    this.props.actions.removeBoca(id);
  };

  render () {
    const { bocas : { bocas, selectedMenu } } = this.props.reducers;
    return (
      <div className='Bocas'>
        <BocaModal/>
        <BocaModalEdit/>
        <Grid columns={2} doubling className='dropDownMenus' padded>
          <Grid.Row>
            <Grid.Column floated='left' width={3}>
              <Button fluid positive onClick={this.openModal('createBocaModal')}>Crear Nueva Boca</Button>
            </Grid.Column>
            <Grid.Column>
              <Dropdown { ...{
                onChange    : this.dropDownChange,
                options     : this.getOptions(),
                placeholder : 'Seleccione Menu',
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
              <Item.Group divided className='available'>
                {
                  _.map(bocas, (boca) => {
                    const { _id, name, picture, description, price } = boca;
                    return (
                      <Item className='boca-item' key={_id}>
                        <Item.Image src={picture} />
                        <Item.Content floated='left'>
                          <Item.Header>{name}</Item.Header>
                          <Item.Meta>
                            <span className='cinema'>Precio : ₡{price}</span>
                          </Item.Meta>
                          <Item.Description>{description}</Item.Description>
                          <Item.Extra>
                            <Button primary floated='right' onClick={this.handleBocaAssign(_id)}>
                              Añadir al Menú
                              <Icon name='right chevron' />
                            </Button>
                            <Button primary floated='right' onClick={this.openModal('editBocaModal', boca)}>
                              Editar
                              <Icon name='right chevron' />
                            </Button>
                          </Item.Extra>
                        </Item.Content>
                      </Item>
                    )
                  })
                }
              </Item.Group>
            </Grid.Column>
            <Grid.Column className='column-scroll'>
              <Item.Group divided className='available'>
                {
                  _.map(selectedMenu.bocas, (boca) => {
                    const { _id, name, picture, description, price } = boca;
                    return (
                      <Item className='boca-item' key={_id}>
                        <Item.Image src={picture} />
                        <Item.Content floated='left'>
                          <Item.Header>{name}</Item.Header>
                          <Item.Meta>
                            <span className='cinema'>Precio : ₡{price}</span>
                          </Item.Meta>
                          <Item.Description>{description}</Item.Description>
                          <Item.Extra>
                            <Button color='red' floated='left' onClick={this.handleBocaRemove(_id)}>
                              <Icon name='left chevron' />
                              Remover del Menu
                            </Button>
                            <Button primary floated='right' onClick={this.openModal('editBocaModal', boca)}>
                              Editar
                              <Icon name='right chevron' />
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

export default connect(mapStateToProps, mapDispatchToProps)(Bocas);
