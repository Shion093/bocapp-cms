import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react'

// Reducers
import { handleLogout } from '../../reducers/auth';
import { handleModal } from '../../reducers/modals';

// Components
import ConfirmModal from '../Modals/ConfirmModal';

import './styles.css';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      handleLogout,
      handleModal,
      changePage: (page) => push(page)
    }, dispatch),
  };
}

class TopBar extends Component {
  logout = () => {
    this.props.actions.handleLogout();
  };

  handleModal = () => {
    this.props.actions.handleModal('confirmModal');
  };


  render() {
    return (
      <Menu inverted className="TopBar" fixed={'top'}>
        <ConfirmModal {...{
          onClick : this.logout,
          title   : 'Cerrar sesion',
          message : 'Estas seguro que quieres cerrar sesion?'
        }}  />
        <Menu.Menu position='right'>
          <Menu.Item name='Salir' onClick={this.handleModal}/>
        </Menu.Menu>
      </Menu>
    );
  }

  goToPage = (page) => () => {
    this.props.actions.changePage(page);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
