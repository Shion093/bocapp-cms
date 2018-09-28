import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { decrement, decrementAsync, increment, incrementAsync } from '../../reducers/counter';
import { handleStoreChange, getRestaurant } from '../../reducers/restaurants';
import { Dropdown } from 'semantic-ui-react';
import { Button, Card, Grid, Icon } from 'semantic-ui-react';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      handleStoreChange,
      getRestaurant,
      changePage: () => push('/menus')
    }, dispatch),
  };
}

class Home extends Component {
  componentDidMount () {
    this.props.actions.getRestaurant();
  }

  dropDownChange = (e, { value }) => {
    this.props.actions.handleStoreChange(value);
  };

  render () {
    const options = [
      {
        key : 1,
        value : true,
        text : 'Abierto',
      },
      {
        key : 2,
        value : false,
        text : 'Cerrado',
      }
    ];
    const { reducers: { restaurants : { restaurant } } } = this.props;
    return (
      <div>
        <Grid columns={1} doubling className='grid-scroll'>
          <Grid.Row className='inner-scroll'>
            <Grid.Column>
              <h1>Tienda {restaurant.name}</h1>
            </Grid.Column>
            <Grid.Column>
              <h2>Estado del comercio</h2>
              <Dropdown { ...{
                onChange    : this.dropDownChange,
                options,
                placeholder : 'Estado actual',
                fluid       : true,
                search      : true,
                selection   : true,
                value       : restaurant.isOpen,
              } }  />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
