import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Button, Card, Grid, Icon } from 'semantic-ui-react';
import _ from 'lodash';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
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
        <Button basic color='green'>Crear</Button>
      </div>
    )
  };

  render () {
    return (
      <div className="menus">
        <Grid columns={4} doubling>
          <Grid.Row>
            <Grid.Column>
              <Card>
                <div className="add-icon">
                  <Icon name='plus'/>
                </div>
                <Card.Content>
                  <Card.Header>
                   Crear Menu
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  {this.renderCreateButton()}
                </Card.Content>
              </Card>
            </Grid.Column>
            {
              _.times(10, () => {
                return (
                  <Grid.Column>
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
