import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Input } from 'semantic-ui-react'

// Pages
import { decrement, decrementAsync, increment, incrementAsync } from '../../reducers/counter';

import './styles.css';

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
      changePage: (page) => push(page)
    }, dispatch),
  };
}

class TopBar extends Component {
  render() {
    return (
      <Menu inverted className="TopBar" fixed={'top'}>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Buscar...'/>
          </Menu.Item>
          <Menu.Item name='Salir'/>
        </Menu.Menu>
      </Menu>
    );
  }

  goToPage = (page) => () => {
    this.props.actions.changePage(page);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
