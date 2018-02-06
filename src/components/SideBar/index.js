import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';

import './styles.css';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      changePage: (page) => push(page)
    }, dispatch),
  };
}

class SideBar extends Component {
  render() {
    return (
      <div className="SideBar">
        <Menu vertical inverted icon='labeled' fluid>
          <Menu.Item name='home' onClick={ this.goToPage('/') }>
            <Icon name='home'/>
            Inicio
          </Menu.Item>
          <Menu.Item name='menus' onClick={ this.goToPage('/menus') }>
            <Icon name='food'/>
            Menus
          </Menu.Item>
          <Menu.Item name='bocas' onClick={ this.goToPage('/bocas') }>
            <Icon name='coffee'/>
            Bocas
          </Menu.Item>
        </Menu>
      </div>
    );
  }
  goToPage = (page) => () => {
    this.props.actions.changePage(page);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
