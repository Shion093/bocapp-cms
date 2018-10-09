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
    const { reducers : { auth : { currentUser }}} = this.props;
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
          <Menu.Item name='products' onClick={ this.goToPage('/products') }>
            <Icon name='coffee'/>
            Productos
          </Menu.Item>
          <Menu.Item name='ordenes' onClick={ this.goToPage('/ordenes') }>
            <Icon name='cart'/>
            Ordenes
          </Menu.Item>
          {
            currentUser.role === 'superAdmin' &&
            <Menu.Item name='stores' onClick={ this.goToPage('/stores') }>
              <Icon name='factory'/>
              Tiendas
            </Menu.Item>
          }
        </Menu>
      </div>
    );
  }
  goToPage = (page) => () => {
    this.props.actions.changePage(page);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
