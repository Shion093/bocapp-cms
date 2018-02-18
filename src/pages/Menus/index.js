import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Button, Card, Grid, Icon } from 'semantic-ui-react';
import _ from 'lodash';

import './styles.css';

// Reducers
import { handleModal } from '../../reducers/modals';

// Components
import MenuModal from '../../components/MenuModal';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      handleModal,
      changePage: () => push('/')
    }, dispatch),
  };
}

class Menus extends Component {

  renderExtraButton = () => {
    return (
      <div className='ui two buttons'>
        <Button basic color='blue'>Editar</Button>
        <Button basic color='red'>Eliminar</Button>
      </div>
    )
  };

  renderCreateButton = () => {
    return (
      <div className='ui two buttons'>
        <Button basic color='green' onClick={this.openCreateModal}>Crear</Button>
      </div>
    )
  };

  openCreateModal = () => {
    this.props.actions.handleModal('createMenuModal')
  };

  render () {
    return (
      <div className="Menus">
        <MenuModal />
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
              _.times(30, (i) => {
                return (
                  <Grid.Column key={i}>
                    <Card
                      image='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg'
                      header='Platos Fuertes'
                      meta='Menu para platos fuertes'
                      extra={ this.renderExtraButton() }
                    />
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
