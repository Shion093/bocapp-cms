import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Transition } from 'semantic-ui-react';

import './styles.css';

// Reducers
import { handleModal } from '../../reducers/modals';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      handleModal,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class ConfirmModal extends Component {
  render() {
    const { confirmModal } = this.props.reducers.modals;
    return (
      <div className='ConfirmModal'>
        <Transition animation='fade up' duration={ 600 } visible={ confirmModal }>
          <Modal
            open={ confirmModal }
            onClose={ this.closeModal }
            header={ this.props.title }
            content={ this.props.message }
            actions={ [
              { key : 'no', content : 'No' },
              { key : 'si', content : 'Si', positive : true, onClick : this.props.onClick },
            ] }
          />
        </Transition>
      </div>
    );
  }

  closeModal = () => {
    this.props.actions.handleModal('confirmModal');
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal)
