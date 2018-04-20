import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Button, Card, Grid, Icon } from 'semantic-ui-react';
import _ from 'lodash';

import './styles.css';

// Reducers
import { handleModal } from '../../reducers/modals';
import { getAllMenus, removeMenu } from '../../reducers/menus';

// Components
import MenuModal from '../../components/MenuModal';
import MenuModalEdit from '../../components/MenuModalEdit';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      getAllMenus,
      handleModal,
      removeMenu,
      changePage: () => push('/')
    }, dispatch),
  };
}

class Menus extends Component {

  componentWillMount () {
    const { menus } = this.props.reducers.menus;
    if (_.isEmpty(menus)) {
      this.props.actions.getAllMenus();
    }
  }
  openModal = (modal, data) => () => {
    this.props.actions.handleModal(modal, data, 'menu');
  };
  deleteMenu = (menuId) => () => {
    this.props.actions.removeMenu(menuId);
  };

  renderExtraButton = (menu) => {
    return (
      <div className='ui two buttons'>
        <Button basic color='blue' onClick={this.openModal('editMenuModal', menu)}>Editar</Button>
        <Button basic color='red' onClick={this.deleteMenu(menu._id)}>Eliminar</Button>
      </div>
    )
  };

  renderCreateButton = () => {
    return (
      <div className='ui two buttons'>
        <Button basic color='green' onClick={this.openModal('createMenuModal')}>Crear</Button>
      </div>
    )
  };

  render () {
    const { menus } = this.props.reducers.menus;
    return (
      <div className="Menus">
        <MenuModal />
        <MenuModalEdit />
        <Grid columns={4} doubling className='grid-scroll'>
          <Grid.Row className='inner-scroll'>
            <Grid.Column>
              <Card>
                <div className="add-icon">
                  <Icon name='plus'/>
                </div>
                <Card.Content>
                  <Card.Header>
                   Crear Menu
                  </Card.Header>
                  <Card.Meta>
                    Añadir un menu nuevo
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  {this.renderCreateButton()}
                </Card.Content>
              </Card>
            </Grid.Column>
            {
              _.map(menus, (menu) => {
                const { _id, picture, name, description } = menu;
                return (
                  <Grid.Column key={_id}>
                    <Card { ...{
                      image  : picture,
                      header : name,
                      meta   : description,
                      extra  : this.renderExtraButton(menu),
                    } } />
                  </Grid.Column>
                )
              })
            }
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
