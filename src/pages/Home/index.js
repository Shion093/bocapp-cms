import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { decrement, decrementAsync, increment, incrementAsync } from '../../reducers/counter';
import { handleStore, getStore } from '../../reducers/store';
import { Dropdown } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react';

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
      handleStore,
      getStore,
      changePage: () => push('/menus')
    }, dispatch),
  };
}

class Home extends Component {
  componentDidMount () {
    this.props.actions.getStore();
  }

  dropDownChange = (e, { value }) => {
    this.props.actions.handleStore(value);
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
    const { reducers: { store : { store } } } = this.props;
    return (
      <div>
        <Grid columns={3} doubling className='grid-scroll'>
          <Grid.Row className='inner-scroll'>
            <Grid.Column>
              <img src={store.banner} />
              <img src={store.logo} />
              <h1>{store.name}</h1>
              <p>{store.description}</p>
              <h1>Estado de la tienda</h1>
              <Dropdown { ...{
                onChange    : this.dropDownChange,
                options,
                placeholder : 'Estado actual',
                fluid       : true,
                search      : true,
                selection   : true,
                value       : store.isOpen,
              } }  />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
