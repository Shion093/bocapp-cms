import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'

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
      <div className="App">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={true} icon='labeled' vertical inverted>
            <Menu.Item name='home' onClick={this.goToPage('/')}>
              <Icon name='home'/>
              Inicio
            </Menu.Item>
            <Menu.Item name='menus' onClick={this.goToPage('/menus')}>
              <Icon name='food'/>
              Menus
            </Menu.Item>
            <Menu.Item name='bocas' onClick={this.goToPage('/menus')}>
              <Icon name='coffee'/>
              Bocas
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            { this.props.children }
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
  goToPage = (page) => () => {
    this.props.actions.changePage(page);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
